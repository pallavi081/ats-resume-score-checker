// A broad dictionary of common tech, business, and soft skills used to detect
// skill mentions inside resumes and job descriptions. This list intentionally
// covers many domains so the tool is useful for a wide range of job types.

export const SKILL_DICTIONARY = [
  // Programming languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang',
  'rust', 'php', 'ruby', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'dart',
  'sql', 'nosql', 'bash', 'shell scripting', 'perl', 'objective-c',

  // Frontend
  'react', 'react.js', 'vue', 'vue.js', 'angular', 'svelte', 'next.js',
  'nuxt.js', 'redux', 'tailwind css', 'tailwind', 'bootstrap', 'sass',
  'html', 'html5', 'css', 'css3', 'webpack', 'vite', 'jquery',

  // Backend
  'node.js', 'nodejs', 'express.js', 'express', 'django', 'flask',
  'spring boot', 'spring', 'fastapi', 'ruby on rails', 'rails', 'asp.net',
  'graphql', 'rest api', 'restful api', 'microservices', 'grpc',

  // Databases
  'mongodb', 'postgresql', 'postgres', 'mysql', 'redis', 'firebase',
  'dynamodb', 'sqlite', 'oracle', 'elasticsearch', 'cassandra', 'mariadb',

  // Cloud & DevOps
  'aws', 'amazon web services', 'azure', 'gcp', 'google cloud',
  'docker', 'kubernetes', 'ci/cd', 'jenkins', 'terraform', 'ansible',
  'github actions', 'gitlab ci', 'devops', 'linux', 'nginx', 'serverless',

  // Data / AI
  'machine learning', 'deep learning', 'data analysis', 'data science',
  'pandas', 'numpy', 'tensorflow', 'pytorch', 'scikit-learn', 'nlp',
  'computer vision', 'data visualization', 'tableau', 'power bi',
  'excel', 'statistics', 'big data', 'spark', 'hadoop', 'etl',

  // Mobile
  'android', 'ios', 'react native', 'flutter', 'mobile development',

  // Tools
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'figma',
  'postman', 'vs code', 'agile', 'scrum', 'kanban', 'unit testing',
  'jest', 'cypress', 'selenium', 'test automation', 'tdd',

  // Business / Soft skills
  'project management', 'product management', 'leadership', 'communication',
  'teamwork', 'problem solving', 'critical thinking', 'time management',
  'stakeholder management', 'negotiation', 'presentation skills',
  'customer service', 'sales', 'marketing', 'seo', 'content writing',
  'copywriting', 'digital marketing', 'social media marketing',
  'business analysis', 'financial analysis', 'budgeting', 'accounting',
  'strategic planning', 'operations management', 'supply chain',
  'human resources', 'recruitment', 'training and development',
  'public speaking', 'analytical skills', 'adaptability', 'collaboration',
  'decision making', 'creativity', 'attention to detail', 'multitasking',

  // Design
  'ui/ux', 'ui design', 'ux design', 'user research', 'wireframing',
  'prototyping', 'adobe photoshop', 'adobe illustrator', 'figma',
  'graphic design', 'sketch', 'adobe xd',

  // Misc tech
  'api integration', 'cloud computing', 'cybersecurity', 'blockchain',
  'salesforce', 'sap', 'erp', 'crm', 'automation', 'system design',
  'object oriented programming', 'oop', 'data structures', 'algorithms',
];

// Common words to ignore when extracting keywords from free text
export const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'this', 'that',
  'these', 'those', 'as', 'by', 'or', 'but', 'if', 'than', 'so', 'too',
  'very', 'can', 'will', 'would', 'should', 'could', 'may', 'might',
  'must', 'shall', 'we', 'you', 'they', 'it', 'he', 'she', 'i', 'their',
  'our', 'your', 'his', 'her', 'its', 'have', 'has', 'had', 'do', 'does',
  'did', 'not', 'no', 'yes', 'all', 'any', 'some', 'each', 'every',
  'other', 'such', 'only', 'own', 'same', 'also', 'just', 'about',
  'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'what',
  'which', 'who', 'whom', 'job', 'role', 'work', 'working', 'years',
  'year', 'experience', 'including', 'etc', 'company', 'team', 'within',
  'across', 'including', 'looking', 'seeking', 'candidate', 'candidates',
  'apply', 'applicants', 'preferred', 'required', 'requirements',
  'responsibilities', 'description', 'position', 'opportunity',
]);

export const EDUCATION_KEYWORDS = [
  'bachelor', 'master', 'phd', 'doctorate', 'b.tech', 'btech', 'm.tech',
  'mtech', 'b.sc', 'bsc', 'm.sc', 'msc', 'mba', 'bca', 'mca', 'b.e',
  'm.e', 'degree', 'diploma', 'university', 'college', 'graduate',
  'undergraduate', 'postgraduate', 'certification', 'certified',
];

export const EXPERIENCE_KEYWORDS = [
  'experience', 'years of experience', 'internship', 'intern',
  'professional experience', 'work experience', 'hands-on experience',
  'proven track record', 'led', 'managed', 'developed', 'built',
  'designed', 'implemented', 'delivered', 'collaborated', 'mentored',
  'supervised', 'spearheaded', 'achieved', 'optimized', 'launched',
];
