// pdfUtils.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatDate } from './helpers';

/**
 * Generate and download a PDF for a curriculum
 * @param {Object} curriculum - The curriculum object
 */
export const downloadCurriculumPDF = (curriculum) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const title = curriculum.title;
    doc.text(title, pageWidth / 2, 20, { align: 'center' });
    
    // Add metadata
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const metadata = `${curriculum.department} | Year ${curriculum.year} | ${curriculum.semester} Semester | Faculty: ${curriculum.faculty}`;
    doc.text(metadata, pageWidth / 2, 30, { align: 'center' });
    
    let yPos = 40;
    
    // Add description
    if (curriculum.description) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Split long description into multiple lines
      const descLines = doc.splitTextToSize(curriculum.description, pageWidth - 28);
      doc.text(descLines, 14, yPos);
      yPos += descLines.length * 6 + 10;
    }
    
    // Add objectives
    if (curriculum.objectives && curriculum.objectives.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Course Objectives', 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      curriculum.objectives.forEach((objective, index) => {
        const objText = `${index + 1}. ${objective}`;
        const objLines = doc.splitTextToSize(objText, pageWidth - 28);
        doc.text(objLines, 14, yPos);
        yPos += objLines.length * 6 + 4;
      });
      
      yPos += 6;
    }
    
    // Add outcomes
    if (curriculum.outcomes && curriculum.outcomes.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Course Outcomes', 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      curriculum.outcomes.forEach((outcome, index) => {
        const outText = `${index + 1}. ${outcome}`;
        const outLines = doc.splitTextToSize(outText, pageWidth - 28);
        doc.text(outLines, 14, yPos);
        yPos += outLines.length * 6 + 4;
      });
      
      yPos += 6;
    }
    
    // Check if we need a new page for units
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add units
    if (curriculum.units && curriculum.units.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Course Units', 14, yPos);
      yPos += 10;
      
      curriculum.units.forEach((unit, index) => {
        // Check if we need a new page
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`Unit ${index + 1}: ${unit.title}`, 14, yPos);
        yPos += 6;
        
        if (unit.description) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const unitDescLines = doc.splitTextToSize(unit.description, pageWidth - 28);
          doc.text(unitDescLines, 14, yPos);
          yPos += unitDescLines.length * 6 + 4;
        }
        
        if (unit.topics && unit.topics.length > 0) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('Topics:', 14, yPos);
          yPos += 6;
          
          doc.setFont('helvetica', 'normal');
          unit.topics.forEach((topic, topicIndex) => {
            const topicText = `• ${topic}`;
            const topicLines = doc.splitTextToSize(topicText, pageWidth - 32);
            doc.text(topicLines, 18, yPos);
            yPos += topicLines.length * 6 + 2;
          });
        }
        
        yPos += 8;
      });
    }
    
    // Check if we need a new page for references
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add textbooks
    if (curriculum.textbooks && curriculum.textbooks.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Textbooks', 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      curriculum.textbooks.forEach((textbook, index) => {
        const textbookText = `${index + 1}. ${textbook}`;
        const textbookLines = doc.splitTextToSize(textbookText, pageWidth - 28);
        doc.text(textbookLines, 14, yPos);
        yPos += textbookLines.length * 6 + 4;
      });
      
      yPos += 6;
    }
    
    // Add references
    if (curriculum.references && curriculum.references.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('References', 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      curriculum.references.forEach((reference, index) => {
        const refText = `${index + 1}. ${reference}`;
        const refLines = doc.splitTextToSize(refText, pageWidth - 28);
        doc.text(refLines, 14, yPos);
        yPos += refLines.length * 6 + 4;
      });
    }
    
    // Add footer
    const currentDate = formatDate(new Date().toISOString());
    doc.setFontSize(8);
    doc.text(`SVIT College Curriculum Management System | Generated on ${currentDate}`, pageWidth / 2, 285, { align: 'center' });
    
    // Save the PDF
    const filename = `${curriculum.title.replace(/\s+/g, '_')}_Curriculum.pdf`;
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating curriculum PDF:', error);
    return false;
  }
};

/**
 * Generate and download a PDF for a list of curriculum
 * @param {Array} curriculumList - Array of curriculum objects
 */
export const downloadCurriculumListPDF = (curriculumList) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SVIT Curriculum List', pageWidth / 2, 20, { align: 'center' });
    
    // Add metadata
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = formatDate(new Date().toISOString());
    doc.text(`Generated on ${currentDate}`, pageWidth / 2, 30, { align: 'center' });
    
    // Prepare table data
    const tableColumn = ["Title", "Department", "Year", "Semester", "Faculty", "Last Updated"];
    const tableRows = curriculumList.map(item => [
      item.title,
      item.department,
      item.year,
      item.semester,
      item.faculty,
      item.lastUpdated
    ]);
    
    // Add table
    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      headStyles: {
        fillColor: [13, 110, 253],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: 40 }
    });
    
    // Add footer
    doc.setFontSize(8);
    doc.text(`SVIT College Curriculum Management System | ${curriculumList.length} items`, pageWidth / 2, 285, { align: 'center' });
    
    // Save the PDF
    doc.save('SVIT_Curriculum_List.pdf');
    
    return true;
  } catch (error) {
    console.error('Error generating curriculum list PDF:', error);
    return false;
  }
};