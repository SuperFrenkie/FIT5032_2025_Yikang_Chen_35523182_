# App Development Project for Health Charity

## Project Overview
### Scenario
As a freelance full-stack web developer, you have been awarded a contract to design and develop a modern web application for a distinguished health charity. This organization supports vulnerable groups such as:
- Indigenous communities
- Migrant communities
- Elderly populations
- Individuals facing mental health challenges
- [Or another group of your choice, to be confirmed with your tutor]

Your expertise in web development and innovative approach will help the charity leverage technology to expand its reach, enhance services, and streamline operations for better community impact.

### Client Overview
The client is a renowned health charity focused on improving the health and well-being of underrepresented communities. They provide crucial resources, support, and education to the selected target group.

### Importance of User Experience (UX)
The success of this project heavily relies on the user experience (UX) of the web application, as it is a critical driver for the charity's business success and community impact.

---

## Business Requirements
The web application must meet the following functional and non-functional business requirements, categorized into A, B, C, D, and E.

### Category A
- **BR (A.1): Development Stack**  
  The web application must be developed using the **VueJS 3 framework**.
  
- **BR (A.2): Responsiveness**  
  The web application must be responsive and compatible with various devices.  
  *Hint: Responsiveness can be achieved using Bootstrap, Materialize CSS, or another framework.*

### Category B
- **BR (B.1): Validations**  
  Implement user input validations with a minimum of **two different types of validations**.
  
- **BR (B.2): Dynamic Data**  
  The application must dynamically fetch and display values from underlying JavaScript data structures (e.g., JSON, state variables, or Vue binding).  
  *Hint: Use Local Storage to persist data beyond the current session.*

### Category C
- **BR (C.1): Authentication**  
  Implement a basic authentication mechanism (login/register functionality and user accounts) to ensure confidentiality.
  
- **BR (C.2): Role-based Authentication**  
  Implement role-based authentication with a minimum of **two roles** to support different authorization levels on pages.
  
- **BR (C.3): Rating**  
  Implement an aggregated rating score feature where users can rate and view the average rating for a particular aspect (e.g., reviews).
  
- **BR (C.4): Security**  
  Implement basic security measures to protect against online attacks such as XSS and follow basic security practices (e.g., client-side data validation).

### Category D
- **BR (D.1): External Authentication**  
  Implement an external authentication mechanism (e.g., **Firebase Auth**).
  
- **BR (D.2): Email**  
  Enable the application to send emails with attachments using **SendGrid API** or another email API service.
  
- **BR (D.3): Interactive Table Data**  
  Display interactive table data with a minimum of **two tables**. Each table must support sorting, searching, and limiting to 10 rows per page. Users must be able to search by individual columns.  
  *Hint: Use DataTables for pagination features. Mock data can be generated using Mockaroo.*
  
- **BR (D.4): Deployment to the Cloud**  
  Deploy a fully working public online version of the application (e.g., on **Cloudflare Pages** or **Google Cloud Hosting**).

### Category E
- **BR (E.1): Cloud Functions**  
  Use serverless functions (e.g., **Firebase Cloud Functions**) to execute server-side functionality.
  
- **BR (E.2): Geo Location**  
  Display a map with a minimum of **two non-trivial features** (e.g., searching places of interest, navigation between places, trip information).  
  *Hint: Use MapBox, Mapify, or similar APIs for map features.*
  
- **BR (E.3): Accessibility**  
  Ensure the application meets **WCAG 2.1 accessibility standards at the AA level**. Provide accessibility features such as keyboard navigability in forms and text alternatives for non-text content.  
  *Hint: Use https://www.accessibilitychecker.org/ for standard accessibility checks.*
  
- **BR (E.4): Export**  
  Enable the application to export data (e.g., as **CSV or PDF files**).

---

## Submission Instructions
- **Submission Platform**: All submissions must be done via the **Moodle submission box**.
- **Code Sharing**: Share your code progress on **GitHub** with your assigned lab tutor as soon as you start the assignment. Failure to do so will result in a marking penalty.
- **Demonstration for D/HD Grades**: To achieve Distinction (D) or High Distinction (HD), you must attend a demonstration (technical interview).

### Submission Deadline
- **Due Date**: Week 2 Sunday, 6 July 2025, 11:55 PM (Moodle)

---

## Report Requirements
You must submit a **5-6 page PDF report** using the provided template. The report must include the following sections:

1. **Executive Summary (300-400 words)**  
   - Brief overview of the project, including the client’s objectives, target audience, and primary goals of the web application.  
   - Conduct original research on different health charity websites to gather fresh ideas.

2. **User Personas (600-800 words)**  
   - Develop **2-3 detailed user personas** representing typical users.  
   - Include demographics, goals, needs, pain points, and how the application will address their requirements.  
   - Each persona should be 200-300 words.  
   - *Tools: PowerPoint, Google Slides, pen/paper, or design tools like Figma or LucidChart.*

3. **Sitemap (1 page)**  
   - Create a comprehensive sitemap using **Draw.io** or **Lucidchart**.  
   - Include all main sections and sub-sections, with a clear hierarchy and brief descriptions of each section’s purpose.

4. **Wireframes/Low-fidelity Prototype (2-3 pages)**  
   - Include sketches or wireframes for **two business requirements (BRs)**, showing basic layout and interface elements.  
   - *Tools: Lucidchart, Draw.io, Figma, or hand-drawn sketches.*

### Submission Template
- Download and use the provided [submission template](https://docs.google.com/document/d/1JCFXYwkwJs-kY-EjDW1Dc9JtsdbEtqRCRcCn3CD4_N0/copy).  
- Export the completed report as a PDF and upload it to Moodle.

---

## Important Notes
### Fairness and Plagiarism Rules
- **Originality**: Your design and implementation must be significantly different from others. Do not share your design, technical solutions, or code.
- **Teacher Assistance**: Teachers cannot directly help with design or provide third-party solutions not covered in the course.
- **Discussions**: If discussing technology with classmates or teachers, use scenarios unrelated to the assessment and limit discussions to course materials.
- **Plagiarism**: Similar designs, solutions, or code may be considered plagiarism and reported to the Academic Integrity Committee.

### Content Research
- Research different health charity websites to understand content types (e.g., blog posts, FAQs, resource guides) and design choices.
- Analyze at least three existing health charity websites for content presentation, user engagement, and visual elements (infographics, photos, videos).
- **AI Usage**: You may use Generative AI for website content (text and images) but **not for code generation**. Declare AI use in the AI Acknowledgements section.
- **Templates**: Do not use Bootstrap or CSS templates.

### Independent Research
- Some advanced features (e.g., Firebase, SendGrid, MapBox) are not covered in course materials. You must independently research and implement these solutions.
- Strong internet research skills are essential for full-stack engineers.