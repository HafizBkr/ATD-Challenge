const requestController = require('../controllers/requestController');
const PDFDocument = require('pdfkit');

describe('generateDocument', () => {
  it('should generate a document with correct information', () => {
    // Créez des données de test simulées
    const requestData = {
      title: 'Test Request',
      description: 'This is a test request',
      status: 'submitted',
      createdBy: 'Test User',
      updatedBy: 'Admin User'
    };

    // Créez un mock de PDFDocument
    const mockPDFDocument = new PDFDocument();
    const textSpy = jest.spyOn(mockPDFDocument, 'text');

    // Appelez la fonction generateDocument avec les données de test simulées
    requestController.generateDocument(requestData);

    // Vérifiez si les appels à la méthode text correspondent aux attentes
    expect(textSpy).toHaveBeenCalledWith('Title: Test Request');
    expect(textSpy).toHaveBeenCalledWith('Description: This is a test request');
    expect(textSpy).toHaveBeenCalledWith('Status: submitted');
    expect(textSpy).toHaveBeenCalledWith('Created by: Test User');
    expect(textSpy).toHaveBeenCalledWith('Updated by: Admin User');
  });
});
