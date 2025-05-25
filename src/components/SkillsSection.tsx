import React from 'react'
import { 
 Brain, 
 Database, 
 Cloud, 
 Code, 
 Cpu, 
 Globe, 
 LayoutDashboard, 
 Users
} from "lucide-react"

interface CardProps {
 children: React.ReactNode;
 className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
 <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-colors duration-200 hover:bg-gray-750 ${className}`}>
   {children}
 </div>
)

const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
 <div className={`p-4 flex flex-row items-center space-x-2 ${className}`}>
   {children}
 </div>
)

const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => (
 <h3 className={`text-lg font-semibold text-white ${className}`}>
   {children}
 </h3>
)

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
 <div className={`p-4 pt-0 ${className}`}>
   {children}
 </div>
)

const Badge: React.FC<CardProps> = ({ children, className = "" }) => (
 <span className={`inline-block px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600 transition-colors duration-200 ${className}`}>
   {children}
 </span>
)

const SkillsSection = () => {
 const skillCategories = [
   {
     name: "ML & AI",
     skills: ["ML", "Deep Learning & Neural Networks", "NLP & NLU", "LLMs & RAG", "Content Moderation", "MLOps & Model Deployment", "Knowledge Base Construction"],
     icon: <Brain className="h-6 w-6" />,
   },
   {
     name: "Data Management",
     skills: ["SQL", "Vector Databases"],
     icon: <Database className="h-6 w-6" />,
   },
   {
     name: "Cloud & Infrastructure",
     skills: ["Docker", "Kubernetes", "Git", "CI/CD", "Distributed Systems", "AWS", "Azure", "GCP"],
     icon: <Cloud className="h-6 w-6" />,
   },
   {
     name: "Programming Languages",
     skills: ["Python", "R", "Java", "JavaScript/TypeScript"],
     icon: <Code className="h-6 w-6" />,
   },
   {
     name: "ML & Data Frameworks",
     skills: ["PyTorch", "TensorFlow", "Gensim", "SpaCy", "NLTK", "Pandas", "NumPy", "Scikit-learn", "SAS"],
     icon: <Cpu className="h-6 w-6" />,
   },
   {
     name: "Web Development",
     skills: ["React", "HTML/CSS", "REST APIs"],
     icon: <Globe className="h-6 w-6" />,
   },
   {
     name: "ML Tools & Development",
     skills: ["Gradio", "Streamlit", "MLFlow", "Weight & Biases", "Langchain", "Chroma"],
     icon: <LayoutDashboard className="h-6 w-6" />,
   },
   {
     name: "Professional Skills",
     skills: ["Technical Leadership", "A/B Testing", "Technical Writing", "Project Management (Jira)", "Stakeholder Communication", "Agile"],
     icon: <Users className="h-6 w-6" />,
   }
 ]

 return (
   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {skillCategories.map((category, index) => (
       <Card key={index}>
         <CardHeader>
           <div className="text-white">
             {category.icon}
           </div>
           <CardTitle>{category.name}</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex flex-wrap gap-2">
             {category.skills.map((skill, skillIndex) => (
               <Badge key={skillIndex}>
                 {skill}
               </Badge>
             ))}
           </div>
         </CardContent>
       </Card>
     ))}
   </div>
 )
}

export default SkillsSection