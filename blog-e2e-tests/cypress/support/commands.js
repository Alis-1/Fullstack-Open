Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username,
      password,
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));
      cy.visit('http://localhost:5173');
    });
  });
  
  Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title, author, url },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`,
      },
    });
  
    cy.visit('http://localhost:5173');
  });