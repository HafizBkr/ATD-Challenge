const { body, validationResult } = require('express-validator');
const Request = require('../models/Request');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

exports.createRequest = async (req, res) => {
    try {
      const { title, description } = req.body;
      const createdBy = req.user.userId;
      const request = new Request({ title, description, createdBy });
      await request.save();
      res.status(201).json({ message: 'Request created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating request', error });
    }
  };

exports.getRequests = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const requests = await Request.find().populate('createdBy').populate('updatedBy');
      res.json(requests);
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, updatedBy } = req.body;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.status = status;
    request.updatedBy = updatedBy;
    await request.save();
    if (status === 'approved') {
      exports.generateDocument(request);
      exports.sendApprovalEmail(request);
    }
    res.json({ message: 'Request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    await request.remove();
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error });
  }
};

exports.generateDocument = (request, doc) => {
  doc = doc || new PDFDocument(); // Par défaut, crée un nouveau PDFDocument s'il n'est pas fourni
  doc.text(`Title: ${request.title}`);
  doc.text(`Description: ${request.description}`);
  doc.text(`Status: ${request.status}`);
  doc.text(`Created by: ${request.createdBy}`);
  doc.text(`Updated by: ${request.updatedBy}`);
  doc.end();
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendApprovalEmail = (request) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: request.createdBy.email,
    subject: 'Request Approved',
    text: `Your request "${request.title}" has been approved.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

exports.sendReminders = async () => {
  const pendingRequests = await Request.find({ status: 'submitted' }).populate('createdBy');
  pendingRequests.forEach(request => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: request.createdBy.email,
      subject: 'Request Reminder',
      text: `Your request "${request.title}" is still pending. Please take action.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Reminder email sent: ' + info.response);
    });
  });
};
