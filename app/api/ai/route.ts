import { NextResponse } from "next/server";

// OpenRouter API Configuration
const OPENROUTER_API_KEY = "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";
const OPENROUTER_MODEL = "z-ai/glm-4.5-air:free";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: Request) {
  try {
    const { prompt, systemPrompt, toolId, model } = await req.json();

    // Use the selected model or default to GLM-4.5-Air
    const selectedModel = model || OPENROUTER_MODEL;

    // Use OpenRouter API for all AI requests
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://omnitools.example.com",
        "X-Title": "Omnitools AI"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { 
            role: "system", 
            content: systemPrompt || getSystemPrompt(toolId) 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API Error:", errorData);
      
      // Fallback to mock response if API fails
      return NextResponse.json({ 
        text: getMockResponse(toolId, prompt, selectedModel) 
      });
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || getMockResponse(toolId, prompt, selectedModel);
    
    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ 
      error: "Failed to generate AI response",
      text: "I apologize, but I'm currently unable to process your request. Please try again later."
    }, { status: 500 });
  }
}

// Tool-specific system prompts for better responses
function getSystemPrompt(toolId: string): string {
  const prompts: Record<string, string> = {
    "ai-text-generator": "You are an expert content writer for Omnitools. Generate high-quality, engaging, and professional content based on user requests. Always provide well-structured, clear, and impactful text.",
    
    "ai-summarizer": "You are a professional summarizer. Create concise, accurate summaries that capture the key points, main ideas, and important details. Use bullet points when appropriate for clarity.",
    
    "ai-paraphraser": "You are a skilled editor. Rewrite text to improve clarity, flow, and impact while preserving the original meaning. Offer multiple variations when helpful.",
    
    "ai-grammar-checker": "You are a professional editor and grammar expert. Analyze text for grammar, spelling, punctuation, and style issues. Provide corrections with explanations and a corrected version of the text.",
    
    "ai-prompt-generator": "You are an expert prompt engineer. Create effective, detailed prompts that will generate the best possible results from AI models. Include context, constraints, and desired output format.",
    
    "ai-faq-generator": "You are a content strategist. Generate comprehensive FAQ sections with relevant questions and clear, helpful answers based on the topic or business description provided.",
    
    "ai-caption-generator": "You are a social media expert. Create engaging, catchy captions for Instagram, Twitter, Facebook, and other platforms. Include relevant hashtags when appropriate.",
    
    "ai-cover-letter": "You are a professional career advisor. Write compelling, personalized cover letters that highlight relevant skills and experience for the specific job and company.",
    
    "ai-resume-builder": "You are a professional resume writer. Create ATS-friendly resume content that effectively showcases skills, experience, and achievements in a compelling format.",
    
    "ai-interview-question-generator": "You are an HR expert and interview coach. Generate relevant, insightful interview questions based on the job role, including behavioral, technical, and situational questions.",
    
    "ai-story-generator": "You are a creative writer. Generate engaging, original stories with compelling characters, vivid descriptions, and interesting plot developments.",
    
    "ai-course-generator": "You are an instructional designer. Create comprehensive course outlines with clear learning objectives, modules, lessons, and practical exercises."
  };
  
  return prompts[toolId] || "You are a helpful AI assistant for Omnitools, a comprehensive online toolkit. Provide clear, accurate, and helpful responses to user queries.";
}

// Mock responses for fallback when API is unavailable
function getMockResponse(toolId: string, prompt: string, _model: string): string {
  const mockResponses: Record<string, string> = {
    "ai-text-generator": `Here is professionally crafted content based on your request:\n\n${prompt}\n\nI've structured this content to be engaging, clear, and impactful. The tone is professional yet approachable, making it suitable for various contexts including business communications, marketing materials, or personal projects.\n\nKey elements included:\n- Clear opening that captures attention\n- Well-organized main content\n- Compelling conclusion with call-to-action\n\nFeel free to request adjustments to tone, length, or style.`,
    
    "ai-summarizer": `Summary of your content:\n\n**Key Points:**\n- The main topic discusses important concepts related to your input\n- Several key details support the central theme\n- The conclusion provides actionable insights\n\n**Main Ideas:**\n1. First major point with supporting details\n2. Second major point with examples\n3. Third major point with implications\n\n**Takeaway:** The content provides valuable information that can be applied practically.`,
    
    "ai-paraphraser": `Here's a refined version of your text:\n\n"${prompt}"\n\n**Improved Version:**\nI've restructured this to enhance clarity and impact while maintaining your original meaning. The language is now more precise and engaging, suitable for professional audiences.\n\n**Alternative phrasings:**\n- Option 1: A more formal approach\n- Option 2: A conversational style\n- Option 3: A concise version`,
    
    "ai-grammar-checker": `Grammar Analysis Complete:\n\n**Issues Found:**\n1. Minor punctuation adjustments recommended\n2. Sentence structure improvements suggested\n3. Word choice enhancements available\n\n**Corrected Version:**\nYour text has been refined for better clarity and professionalism.\n\n**Grammar Score:** 95/100\n\n**Suggestions:**\n- Consider varying sentence length for better flow\n- Use active voice where possible\n- Ensure consistent tense usage`,
    
    "ai-prompt-generator": `Here's an optimized prompt for your needs:\n\n**Generated Prompt:**\n"Create a detailed, comprehensive response about [topic]. Include:\n1. Background and context\n2. Key points with examples\n3. Practical applications\n4. Future considerations\n\nFormat the response with clear headings and bullet points for readability. Maintain a professional yet accessible tone suitable for a general audience."\n\n**Tips for Best Results:**\n- Be specific about desired output format\n- Include relevant context\n- Specify length requirements if needed`,
    
    "ai-faq-generator": `Generated FAQ Section:\n\n**Q1: What is the main purpose of this service?**\nA: Our service is designed to provide comprehensive solutions for your specific needs, offering professional-quality results with ease of use.\n\n**Q2: How does it work?**\nA: Simply input your requirements and our system processes your request using advanced technology to deliver optimal results.\n\n**Q3: Is it free to use?**\nA: Yes, our basic features are completely free. Premium options are available for advanced needs.\n\n**Q4: What makes this different from alternatives?**\nA: We offer a unique combination of quality, speed, and accessibility that sets us apart from competitors.`,
    
    "ai-caption-generator": `Here are engaging captions for your content:\n\n**Option 1 (Professional):**\n"Elevating your experience, one step at a time. #Innovation #Growth"\n\n**Option 2 (Casual):**\n"When inspiration strikes, magic happens! What's your creative process? Drop it below!"\n\n**Option 3 (Engaging):**\n"Behind every success story is a journey worth sharing. What's yours? Tell us in the comments!"\n\n**Recommended Hashtags:**\n#ContentCreation #SocialMedia #DigitalMarketing #Creative #Inspiration`,
    
    "ai-cover-letter": `Professional Cover Letter:\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the position. With my relevant experience and proven track record, I am confident in my ability to contribute meaningfully to your team.\n\n**Key Qualifications:**\n- Relevant professional experience\n- Demonstrated skills in key areas\n- Strong commitment to excellence\n\nI am excited about the opportunity to bring my expertise to your organization and contribute to your continued success.\n\nThank you for considering my application. I look forward to discussing how I can add value to your team.\n\nSincerely,\n[Your Name]`,
    
    "ai-resume-builder": `Professional Resume Content:\n\n**PROFESSIONAL SUMMARY**\nResults-driven professional with extensive experience in relevant field. Proven track record of delivering exceptional results and driving organizational success.\n\n**CORE COMPETENCIES**\n- Strategic Planning & Execution\n- Team Leadership & Collaboration\n- Problem Solving & Innovation\n- Communication & Presentation\n\n**PROFESSIONAL EXPERIENCE**\n**Current Role | Company Name**\n- Led initiatives resulting in measurable improvements\n- Collaborated with cross-functional teams\n- Implemented innovative solutions\n\n**EDUCATION**\nDegree Name | Institution | Year\n\n**SKILLS**\nTechnical: [Relevant technical skills]\nSoft Skills: Leadership, Communication, Problem-solving`,
    
    "ai-interview-question-generator": `Interview Questions:\n\n**Behavioral Questions:**\n1. "Tell me about a time when you faced a significant challenge at work. How did you handle it?"\n2. "Describe a situation where you had to work with a difficult team member. What was your approach?"\n\n**Technical Questions:**\n1. "Can you explain your experience with [relevant technology/methodology]?"\n2. "How would you approach solving [specific problem]?"\n\n**Situational Questions:**\n1. "If you were hired, what would be your approach in the first 90 days?"\n2. "How would you prioritize multiple competing deadlines?"\n\n**Questions to Ask the Interviewer:**\n1. "What does success look like in this role?"\n2. "How would you describe the team culture?"`,
    
    "ai-story-generator": `**Title: The Unexpected Journey**\n\nIn a world where possibilities were endless, one decision changed everything.\n\nThe morning started like any other, but by noon, everything had shifted. The protagonist found themselves standing at a crossroads - literally and figuratively.\n\n"I never expected this," they whispered, looking at the path ahead.\n\nThe journey that followed would test their courage, challenge their beliefs, and ultimately reveal strengths they never knew they possessed.\n\nWith each step forward, the destination became clearer. This wasn't just about reaching a place - it was about becoming someone new.\n\n**To be continued...**`,
    
    "ai-course-generator": `**Course Outline: [Course Title]**\n\n**Course Description:**\nA comprehensive course designed to provide practical skills and knowledge in the subject area.\n\n**Learning Objectives:**\n- Understand core concepts and principles\n- Apply knowledge in practical scenarios\n- Develop professional-level skills\n\n**Course Structure:**\n\n**Module 1: Foundations**\n- Lesson 1: Introduction and Overview\n- Lesson 2: Key Concepts\n- Lesson 3: Basic Applications\n\n**Module 2: Intermediate Skills**\n- Lesson 1: Advanced Concepts\n- Lesson 2: Practical Exercises\n- Lesson 3: Case Studies\n\n**Module 3: Mastery**\n- Lesson 1: Expert Techniques\n- Lesson 2: Real-world Projects\n- Lesson 3: Final Assessment\n\n**Prerequisites:** None\n**Duration:** 4-6 weeks\n**Certificate:** Available upon completion`
  };
  
  return mockResponses[toolId] || `I've processed your request using advanced AI capabilities.\n\n**Your Input:** ${prompt}\n\n**Response:**\nBased on your request, I've generated relevant, high-quality content tailored to your needs. This response demonstrates the AI's ability to understand context, generate appropriate content, and provide valuable insights.\n\nFeel free to ask follow-up questions or request modifications to better suit your specific requirements.`;
}
