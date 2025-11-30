'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

interface ResumeData {
  personalInfo: any;
  careerSummary: any;
  workExperiences: any[];
  educations: any[];
  certifications: any[];
  contactInfo: any;
}

export async function generateResume(data: ResumeData): Promise<string> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY must be set in environment variables.');
  }
  
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GEMINI_API_KEY) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
  }

  const prompt = `Create a stunning, modern, professional HTML resume that fits perfectly on a single A4 page (210mm x 297mm) for PDF download.

  PERSONAL INFORMATION:
  - Name: ${data.personalInfo.firstName} ${data.personalInfo.lastName}
  - Phone: ${data.personalInfo.phoneNumber}
  - Email: ${data.personalInfo.emailAddress}
  - Address: ${data.personalInfo.address}, ${data.personalInfo.city}, ${data.personalInfo.state}, ${data.personalInfo.zipCode}, ${data.personalInfo.country}
  
  CAREER SUMMARY:
  - Job Title: ${data.careerSummary.jobTitle}
  - Summary: ${data.careerSummary.summary}
  
  WORK EXPERIENCE:
  ${data.workExperiences.map(exp => `
  - Job Title: ${exp.jobTitle}
  - Company: ${exp.companyName}
  - Period: ${exp.startDate} - ${exp.endDate}
  - Description: ${exp.description}
  - Skills: ${exp.skills.join(', ')}
  `).join('\n')}
  
  EDUCATION:
  ${data.educations.map(edu => `
  - Degree: ${edu.degree} in ${edu.major}
  - Institution: ${edu.institution}
  - Period: ${edu.startDate} - ${edu.endDate}
  `).join('\n')}
  
  CERTIFICATIONS:
  ${data.certifications.map(cert => `
  - Title: ${cert.title}
  - Organization: ${cert.organization}
  - Issued: ${cert.issueDate}${cert.expiryDate ? `, Expires: ${cert.expiryDate}` : ''}
  `).join('\n')}
  
  CONTACT LINKS:
  - LinkedIn: ${data.contactInfo.linkedIn || 'Not provided'}
  - Portfolio: ${data.contactInfo.portfolio || 'Not provided'}
  - Social Media: ${data.contactInfo.socialMedia.map((s: any) => `${s.platform}: ${s.url}`).join(', ') || 'Not provided'}
  
  CRITICAL REQUIREMENTS:
  
  1. DESIGN PHILOSOPHY:
     - Create a completely unique, fresh, and modern design every single time
     - Never repeat the same layout or style twice
     - Think like a world-class designer - make it visually striking and memorable
     - Use contemporary design trends and best practices
     - Make recruiters say "WOW!" when they see it
  
  2. PAGE SPECIFICATIONS:
     - Exact dimensions: 210mm width × 297mm height (A4)
     - MUST fit all content on single page - no overflow
     - Optimize for PDF printing and download
     - Use appropriate margins for professional appearance
  
  3. CONTENT HIERARCHY:
     - Name should be the most prominent element
     - Clear visual distinction between sections
     - Easy-to-scan layout for recruiters (they spend 6-7 seconds initially)
     - Logical flow of information
     - Balance between text and whitespace
  
  4. TECHNICAL REQUIREMENTS:
     - All CSS must be inline styles
     - NO external stylesheets or resources
     - NO images, icons from external URLs, or profile pictures
     - Use HTML entities and Unicode symbols for visual elements if needed (●, ▪, ►, ✓, etc.)
     - Ensure all links are clickable and properly formatted:
       * Email: mailto: link
       * Phone: tel: link  
       * LinkedIn and Portfolio: clickable URLs with proper href
     - PDF-safe colors (avoid pure black #000)
  
  5. CSS PROPERTY FORMATTING RULES (VERY IMPORTANT):
     - NEVER use hyphenated properties like: padding-top, margin-left, border-radius, background-color, font-size, etc.
     - ALWAYS use shorthand properties: padding, margin, border, background, font
     - Examples:
       * WRONG: padding-top: 10px; margin-left: 5px;
       * CORRECT: padding: 10px 0 0 0; margin: 0 0 0 5px;
     - For single-direction spacing, use shorthand with zeros:
       * Top only: padding: 10px 0 0 0; (top right bottom left)
       * Left only: margin: 0 0 0 15px;
       * Top and bottom: padding: 10px 0;
       * Left and right: margin: 0 20px;
     - Common property conversions:
       * padding-top → padding: [value] 0 0 0;
       * margin-bottom → margin: 0 0 [value] 0;
       * background-color → background: [color];
       * font-size → font: [size]/[line-height] [family]; or just font-size is OK but prefer font shorthand
       * border-left → border-left works, but prefer border: [width] [style] [color];
     - This ensures maximum compatibility with PDF rendering engines
  
  6. CREATIVE FREEDOM:
     - Experiment with different layouts (columns, grids, asymmetric, etc.)
     - Choose any professional color palette that looks modern
     - Use any font combination that enhances readability
     - Add visual elements like borders, dividers, backgrounds, shadows
     - Make it unique - no two resumes should look alike
     - Push design boundaries while maintaining professionalism
  
  7. MUST INCLUDE:
     - All provided personal information
     - Career summary prominently displayed
     - Complete work experience with all details
     - All education entries
     - All certifications
     - All contact links (email, phone, LinkedIn, portfolio, social media)
  
  8. READABILITY:
     - Font sizes must be readable when printed (not too small)
     - Sufficient contrast between text and background
     - Proper line spacing and paragraph spacing
     - Clear section separation
  
  OUTPUT INSTRUCTIONS:
  - Generate ONLY pure HTML code
  - Start with <div> and end with </div>
  - NO markdown code blocks (no \`\`\`html)
  - NO explanations, comments, or additional text
  - The output should be immediately usable HTML that renders perfectly and prints beautifully as PDF
  - Remember: Use shorthand CSS properties (padding, margin) instead of hyphenated ones (padding-top, margin-left)
  
  Be creative, be bold, be different every time. Design something that stands out while remaining professional and ATS-friendly.`;

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    // Clean the response
    let cleaned = text.trim();
    
    // Remove markdown code blocks if present
    cleaned = cleaned.replace(/```html\s*/g, '').replace(/```\s*/g, '');
    
    // Extract HTML content
    const htmlMatch = cleaned.match(/<div[\s\S]*<\/div>/i);
    if (htmlMatch) {
      cleaned = htmlMatch[0];
    }

    return cleaned;
  } catch (error: any) {
    console.error('Error generating resume:', error);
    
    if (error?.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env.local file.');
    }
    
    if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    throw new Error(`Failed to generate resume: ${error?.message || 'Unknown error'}`);
  }
}
