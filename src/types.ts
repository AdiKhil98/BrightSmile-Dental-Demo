export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type LeadPayload = {
  source: string;
  submittedAt: string;
  lead: {
    fullName: string;
    phone: string;
    email: string;
    service: string;
    preferredTime: string;
    message: string;
  };
  meta: {
    userAgent: string;
    pageUrl: string;
    referrer: string;
  };
};
