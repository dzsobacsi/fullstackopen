Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(response => {
    localStorage.setItem('loggedAppUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', blog => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username, name, password
  })
})

describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser({
      username: 'tester',
      name: 'Joe Tester',
      password: 'testpassword'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('testpassword')
      cy.get('#loginbutton').click()
      cy.contains('Joe Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginbutton').click()
      cy.get('#message')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'tester',
        password: 'testpassword'
      })
    })

    it('a blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('Joe Tester')
      cy.get('#url').type('http://blogtest.com')
      cy.get('button').contains('add').click()
      cy.contains('a new blog test blog by Joe Tester added')
      cy.get('.blog-short').should('have.length', 1)
    })

    describe('An existing blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test blog',
          author: 'Jack Tester',
          url: 'http://blogtest.com',
          likes: 22
        })
        cy.addUser({
          username: 'anotheruser',
          name: 'Oscar Outsider',
          password: 'mynameisoscar'
        })
      })

      it('can be liked', function() {
        cy.get('.blog-short').find('button').contains('view').click()
        cy.get('.blog-detailed').find('button').contains('like').click()
        cy.get('.blog-detailed')
          .should('not.contain', '22')
          .and('contain', '23')
      })

      it('can be removed by the user who added it', function () {
        cy.get('.blog-short').find('button').contains('view').click()
        cy.get('.blog-detailed').find('button').contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.get('html')
          .should('not.contain', '.blog-short')
          .and('not.contain', '.blog-detailed')
      })

      it('cannot be removed by another user', function() {
        cy.get('button').contains('logout').click()
        cy.login({ username: 'anotheruser', password: 'mynameisoscar' })
        cy.get('.blog-short').find('button').contains('view').click()
        cy.get('.blog-detailed').should('not.contain', 'remove')
      })
    })

    describe('The visible blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a blog with 1 like',
          author: 'Jack Tester',
          url: 'http://blogtest.com',
          likes: 1
        })
        cy.createBlog({
          title: 'a blog with 2 likes',
          author: 'Jack Tester',
          url: 'http://blogtest.com',
          likes: 2
        })
        cy.createBlog({
          title: 'a blog with 3 likes',
          author: 'Jack Tester',
          url: 'http://blogtest.com',
          likes: 3
        })
      })

      it('are sorted according their number of likes', function() {
        /*cy.get('.blog-short').each(($bl) => {
          cy.wrap($bl).contains('view').click()
        })*/
        cy.get('.blog-short:first').should('contain', 'a blog with 3 likes')
        cy.get('.blog-short:last').should('contain', 'a blog with 1 like')
      })
    })
  })
})
