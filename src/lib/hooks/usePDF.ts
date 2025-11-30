'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function usePDF() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (element: HTMLElement, filename: string) => {
    setIsGenerating(true);
    try {
      // Wait for content to fully render
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get the actual dimensions of the element
      const rect = element.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      
      // Extract all links from the element before converting to canvas
      const links: Array<{ href: string; x: number; y: number; width: number; height: number }> = [];
      const linkElements = element.querySelectorAll('a');
      
      linkElements.forEach((link) => {
        const linkRect = link.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const href = link.getAttribute('href') || link.href;
        
        // Only add valid links
        if (href && href !== '#' && href.trim() !== '' && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'))) {
          links.push({
            href: href,
            x: linkRect.left - elementRect.left,
            y: linkRect.top - elementRect.top,
            width: linkRect.width,
            height: linkRect.height,
          });
        }
      });
      
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        allowTaint: false,
        removeContainer: false,
        imageTimeout: 20000,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded in cloned document
          const images = clonedDoc.querySelectorAll('img');
          images.forEach((img: HTMLImageElement) => {
            if (!img.complete) {
              img.style.display = 'none';
            }
          });
          
          // Preserve all inline styles and ensure proper rendering
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Preserve display properties
            const computedStyle = window.getComputedStyle(htmlEl);
            if (computedStyle.display === 'flex') {
              htmlEl.style.display = 'flex';
            }
            // Ensure box-sizing
            htmlEl.style.boxSizing = 'border-box';
            // Preserve colors
            if (htmlEl.style.color) {
              htmlEl.style.color = htmlEl.style.color;
            }
            if (htmlEl.style.backgroundColor) {
              htmlEl.style.backgroundColor = htmlEl.style.backgroundColor;
            }
            // Preserve borders
            if (htmlEl.style.border) {
              htmlEl.style.border = htmlEl.style.border;
            }
            if (htmlEl.style.borderLeft) {
              htmlEl.style.borderLeft = htmlEl.style.borderLeft;
            }
            if (htmlEl.style.borderRight) {
              htmlEl.style.borderRight = htmlEl.style.borderRight;
            }
          });
          
          // Ensure links are visible and properly styled
          const clonedLinks = clonedDoc.querySelectorAll('a');
          clonedLinks.forEach((link: HTMLAnchorElement) => {
            if (!link.style.color || link.style.color === '') {
              link.style.color = '#2563eb';
            }
            link.style.textDecoration = 'none';
          });
        },
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Calculate image dimensions to fit A4
      let imgWidth = pdfWidth;
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Force single page - if content exceeds one page, scale it down
      if (imgHeight > pdfHeight) {
        const scaleFactor = pdfHeight / imgHeight;
        imgWidth = imgWidth * scaleFactor;
        imgHeight = pdfHeight;
      }
      
      // Calculate scale factors for converting pixels to mm (based on actual image dimensions in PDF)
      const scaleX = imgWidth / width;
      const scaleY = imgHeight / height;
      
      // Always fit on single page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
      // Add clickable links to PDF
      links.forEach((link) => {
        const linkX = (link.x * scaleX);
        const linkY = (link.y * scaleY);
        const linkWidth = (link.width * scaleX);
        const linkHeight = (link.height * scaleY);
        
        // Only add links that fit on the page
        if (linkY >= 0 && linkY < pdfHeight && link.href && link.href !== '#' && link.href.trim() !== '') {
          try {
            pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.href });
          } catch (error) {
            console.warn('Failed to add link to PDF:', link.href, error);
          }
        }
      });

      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating };
}

