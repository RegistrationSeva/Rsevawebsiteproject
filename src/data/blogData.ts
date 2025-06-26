import { BlogPost, BlogCategory } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Business Registration in India",
    category: "Business Registration",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog/business-registration.jpg",
    excerpt:
      "Learn about the different types of business registrations available in India and choose the right one for your business needs.",
    content: `
      Business registration is a crucial step for any entrepreneur looking to establish a legitimate business entity in India. This comprehensive guide will help you understand the various types of business registrations available and how to choose the right one for your needs.

      Types of Business Registration in India:
      1. Sole Proprietorship
      2. Partnership Firm
      3. Limited Liability Partnership (LLP)
      4. Private Limited Company
      5. One Person Company (OPC)
      6. Public Limited Company

      Each type of business registration has its own advantages, requirements, and compliance obligations. Let's explore each in detail...
    `,
  },
  {
    id: 2,
    title: "GST Registration Process Made Simple",
    category: "Taxation",
    date: "March 10, 2024",
    readTime: "4 min read",
    image: "/blog/gst-registration.jpg",
    excerpt:
      "A step-by-step guide to help you understand and complete your GST registration process efficiently.",
  },
  {
    id: 3,
    title: "Trademark Registration: Protect Your Brand",
    category: "Trademark",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/blog/trademark.jpg",
    excerpt:
      "Understand the importance of trademark registration and how it can protect your brand identity.",
  },
  {
    id: 4,
    title: "Company Registration: Private Limited vs LLP",
    category: "Business Registration",
    date: "March 1, 2024",
    readTime: "7 min read",
    image: "/blog/company-registration.jpg",
    excerpt:
      "Compare the benefits and requirements of Private Limited Company and LLP registration in India.",
  },
  {
    id: 5,
    title: "Income Tax Filing Guidelines for Businesses",
    category: "Taxation",
    date: "February 28, 2024",
    readTime: "5 min read",
    image: "/blog/tax-filing.jpg",
    excerpt:
      "Essential guidelines and deadlines for filing income tax returns for different types of businesses.",
  },
  {
    id: 6,
    title: "MSME Registration Benefits",
    category: "Business Registration",
    date: "February 25, 2024",
    readTime: "4 min read",
    image: "/blog/msme-registration.jpg",
    excerpt:
      "Discover the advantages and process of registering your business under MSME classification.",
  },
  {
    id: 7,
    title: "Digital Signature Certificate Guide",
    category: "Business Registration",
    date: "February 20, 2024",
    readTime: "5 min read",
    image: "/blog/dsc-guide.jpg",
    excerpt:
      "Everything you need to know about obtaining and using a Digital Signature Certificate for your business.",
  },
];

export const categories: BlogCategory[] = [
  { value: "all", label: "All Categories" },
  { value: "business-registration", label: "Business Registration" },
  { value: "taxation", label: "Taxation" },
  { value: "trademark", label: "Trademark" },
];
