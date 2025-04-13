describe('Blog app', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      });
      cy.visit('http://localhost:5173');
    });
  
    it('Login form is shown', function () {
      cy.contains('login');
    });
  
    describe('Login', function () {
      it('succeeds with correct credentials', function () {
        cy.get('input[name="username"]').type('mluukkai');
        cy.get('input[name="password"]').type('salainen');
        cy.get('button[type="submit"]').click();
  
        cy.contains('Matti Luukkainen logged in');
      });
  
      it('fails with wrong credentials', function () {
        cy.get('input[name="username"]').type('mluukkai');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();
  
        cy.get('.error').should('contain', 'invalid username or password');
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
      });
    });
  
    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'mluukkai', password: 'salainen' });
      });
  
      it('A blog can be created', function () {
        cy.contains('new blog').click();
        cy.get('input[name="title"]').type('Test Blog');
        cy.get('input[name="author"]').type('Test Author');
        cy.get('input[name="url"]').type('http://testblog.com');
        cy.get('button[type="submit"]').click();
  
        cy.contains('Test Blog');
      });
  
      it('A blog can be liked', function () {
        cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'http://testblog.com' });
  
        cy.contains('Test Blog').parent().find('button').contains('view').click();
        cy.contains('like').click();
        cy.contains('likes 1');
      });
  
      it('A blog can be deleted by its creator', function () {
        cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'http://testblog.com' });
  
        cy.contains('Test Blog').parent().find('button').contains('view').click();
        cy.contains('remove').click();
  
        cy.get('html').should('not.contain', 'Test Blog');
      });
  
      it('Only the creator sees the delete button', function () {
        cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'http://testblog.com' });
  
        cy.contains('logout').click();
  
        cy.request('POST', 'http://localhost:3003/api/users', {
          name: 'Other User',
          username: 'otheruser',
          password: 'password',
        });
        cy.login({ username: 'otheruser', password: 'password' });
  
        cy.contains('Test Blog').parent().find('button').contains('view').click();
        cy.contains('remove').should('not.exist');
      });
  
      it('Blogs are ordered by likes', function () {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'http://blog1.com' });
        cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'http://blog2.com' });
  
        cy.contains('Blog 1').parent().find('button').contains('view').click();
        cy.contains('Blog 2').parent().find('button').contains('view').click();
  
        cy.contains('Blog 2').parent().find('button').contains('like').click();
        cy.wait(500);
        cy.contains('Blog 2').parent().find('button').contains('like').click();
  
        cy.get('.blog').eq(0).should('contain', 'Blog 2');
        cy.get('.blog').eq(1).should('contain', 'Blog 1');
      });
    });
  });