describe('POST api testing', () => {
    it('Approach_1 hard coded json object', () => {
        const requestBody = {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        cy.request({
            method: 'POST',
            url: 'http://jsonplaceholder.typicode.com/posts',
            body: requestBody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.title).to.eq(requestBody.title)
                expect(response.body.body).to.eq(requestBody.body)
            })
    })

    it('Approach_2 Dynamically generated json object', () => {
        const requestBody = {
            title: Math.random().toString(5).substring(2),
            body: 'bar',
            userId: 1
        }
        cy.request({
            method: 'POST',
            url: 'http://jsonplaceholder.typicode.com/posts',
            body: requestBody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.title).to.eq(requestBody.title)
                expect(response.body.body).to.eq(requestBody.body)
            })
    })

    it.only('Approach_3 using fixture json object', () => {
        cy.fixture('users').then((userData) => {
            const requestBody=userData;
        
        cy.request({
            method: 'POST',
            url: 'http://jsonplaceholder.typicode.com/posts',
            body: requestBody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.title).to.eq(requestBody.title)
                expect(response.body.body).to.eq(requestBody.body)
                
                expect(response.body).has.property('title',requestBody.title)
            })
        })
    })
})
