// //1. unit under test
// describe('Products Service', function() {
//     describe('Add new product', function() {
//       //2. scenario and 3. expectation
//       it('When no price is specified, then the product status is pending approval', ()=> {
//         const newProduct = new ProductService().add(...);
//         expect(newProduct.status).to.equal('pendingApproval');
//       });
//     });
//   });


// describe("Customer classifier", () => {
//     test("When customer spent more than 500$, should be classified as premium", () => {
//       //Arrange
//       const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
//       const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });
  
//       //Act
//       const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
  
//       //Assert
//       expect(receivedClassification).toMatch("premium");
//     });
//   });