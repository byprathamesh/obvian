import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

// Add this type above the projects array:
type Project = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  longDescription: string;
  gallery: string[];
  stats: { label: string; value: string }[];
  features: string[];
  testimonials: { text: string; author: string; role: string }[];
  tags: string[];
  image?: string;
};

// This would usually come from an API, but for now we'll define it here
const projects = [
  {
    id: "neo-living-nyc",
    title: "Neo Living NYC",
    location: "New York City, NY",
    date: "2024",
    description: "A flagship residential building featuring 200 Obvian-enabled apartments in the heart of Manhattan. Each unit showcases our latest adaptive living technology, allowing residents to transform their spaces from bedroom to office to entertainment area with a simple voice command or app control.",
    longDescription: "Neo Living represents the pinnacle of Obvian's residential implementation, with each apartment serving as a showcase for our transformative technology. Located in Manhattan's vibrant Chelsea district, this 25-story tower features 200 units ranging from studios to three-bedroom apartments, all equipped with our core adaptive systems.\n\nResidents enjoy spaces that evolve throughout their day - waking up to a bedroom that transforms into a home office, then converts to an entertainment space in the evening, and back to a bedroom at night. All transformations occur within seconds, with furniture and fixtures automatically repositioning themselves.\n\nThe building also features common areas with Obvian technology, including flex spaces that serve as co-working environments during weekdays and transform into community gathering spaces during evenings and weekends.",
    gallery: [
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    stats: [
      { label: "Units", value: "200" },
      { label: "Floor area", value: "180,000 sq ft" },
      { label: "Completion", value: "2024" },
      { label: "Architecture", value: "Foster + Partners" },
      { label: "Developer", value: "Urban Visions" },
      { label: "Technology", value: "Obvian Core 2.0" }
    ],
    features: [
      "Full apartment automation with voice and app control",
      "Transforming furniture systems with memory positioning",
      "Smart walls that shift to create different room configurations",
      "Integrated technology hubs in each unit",
      "Community spaces that adapt to different uses throughout the day",
      "Building-wide resource optimization systems"
    ],
    testimonials: [
      {
        text: "My Neo Living apartment has transformed how I live. I no longer feel limited by my square footage - it's like having three different apartments in one.",
        author: "Sarah L., Resident",
        role: "Tech Executive"
      },
      {
        text: "As a developer, incorporating Obvian's systems has allowed us to offer unprecedented functionality in smaller units, making urban living more accessible and practical.",
        author: "Michael T.",
        role: "Urban Visions Development"
      }
    ],
    tags: ["Residential", "Urban", "Flagship"]
  },
  {
    id: "tech-hub-sf",
    title: "Tech Hub SF",
    location: "San Francisco, CA",
    date: "2023",
    description: "A revolutionary co-working space with Obvian's flexible workstations that transform based on daily needs.",
    longDescription: "Tech Hub SF reimagines the co-working space for the post-pandemic world. Located in San Francisco's SoMa district, this 45,000 sq ft facility features Obvian's commercial workspace systems throughout.\n\nThe space includes 150 adaptive workstations that can transform from individual focus spaces to collaborative team environments in seconds. Conference rooms can expand or contract based on meeting size, and social areas can transform for different events or functions.\n\nTech Hub SF serves as Obvian's West Coast showcase for our commercial applications, demonstrating how adaptive spaces can maximize real estate efficiency while providing optimal working environments for different activities.",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5"
    ],
    stats: [
      { label: "Workspaces", value: "150" },
      { label: "Floor area", value: "45,000 sq ft" },
      { label: "Completion", value: "2023" },
      { label: "Architecture", value: "Studio Gang" },
      { label: "Operator", value: "FlexWork Inc" },
      { label: "Technology", value: "Obvian Business Suite" }
    ],
    features: [
      "Adaptive workstations that transform between different configurations",
      "Conference rooms that expand or contract based on meeting size",
      "Sound-masking technology for privacy in open environments",
      "Integrated booking system with automatic space preparation",
      "Personalized environment settings that follow users throughout the facility",
      "Advanced air purification and environmental control systems"
    ],
    testimonials: [
      {
        text: "Tech Hub has completely changed how our team works. We can reconfigure our space multiple times a day depending on our needs.",
        author: "David W.",
        role: "Startup Founder"
      },
      {
        text: "The flexibility of the space means we only pay for what we need, when we need it. It's like having a custom office that evolves with our business.",
        author: "Jennifer K.",
        role: "CFO, TechVentures"
      }
    ],
    tags: ["Commercial", "Co-working", "Tech"]
  },
  {
    id: "wellness-center-la",
    title: "Wellness Center LA",
    location: "Los Angeles, CA",
    date: "2024",
    description: "An integrated healthcare and wellness facility with adaptive treatment rooms and recovery spaces.",
    longDescription: "placeholder",
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15",
      "https://images.unsplash.com/photo-1598446322291-1979e4223559",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09"
    ],
    stats: [
      { label: "Treatment rooms", value: "35" },
      { label: "Floor area", value: "28,000 sq ft" },
      { label: "Completion", value: "2024" }
    ],
    features: [
      "Transformable treatment spaces for different modalities",
      "Privacy-optimized consultation rooms",
      "Relaxation areas with personalized environment settings",
      "Advanced sanitation systems",
      "Integrated medical technology interfaces",
      "Accessibility features throughout"
    ],
    testimonials: [
      {
        text: "The adaptive treatment rooms allow us to offer more services without requiring more physical space.",
        author: "Dr. Lisa M.",
        role: "Medical Director"
      }
    ],
    tags: ["Healthcare", "Wellness", "Innovation"]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        toast({
          title: "Project not found",
          description: "The project you're looking for doesn't exist.",
          variant: "destructive"
        });
        navigate("/projects");
      }
      setLoading(false);
    }, 500);
    
    window.scrollTo(0, 0);
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obvian-black text-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-obvian-cyan/30 border-t-obvian-cyan animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) return null;

  return (
    <motion.div 
      className="min-h-screen bg-obvian-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      
      {/* Hero section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-obvian-black/70 z-10"></div>
          <video
            src="https://static.vecteezy.com/system/resources/previews/033/658/784/mp4/modern-office-building-with-silhouettes-of-businessmen-walking-on-sidewalk-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-60 blur-sm scale-105 absolute inset-0"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-obvian-black/20 group"
              onClick={() => navigate("/projects")}
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-6 max-w-4xl">
            <div>
              <div className="flex items-center gap-2 text-obvian-cyan mb-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-4 h-4" />
                <span>{project.date}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              
              <p className="text-lg text-obvian-gray/90 max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden">
              <video
                src="https://static.vecteezy.com/system/resources/previews/033/658/784/mp4/modern-office-building-with-silhouettes-of-businessmen-walking-on-sidewalk-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-60 blur-sm scale-105 absolute inset-0"
                style={{ zIndex: 0 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Details section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-white animate-fade-in-up delay-100">About this Project</h2>
              {project.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-obvian-gray/90 mb-4 animate-fade-in-up" style={{animationDelay: `${100 + index * 60}ms`, animationFillMode: 'forwards'}}>
                  {paragraph}
                </p>
              ))}
              <h3 className="text-xl font-bold mt-8 mb-4 text-white animate-fade-in-up delay-200">Key Features</h3>
              <ul className="space-y-3">
                {project.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start animate-fade-in-up" style={{animationDelay: `${200 + index * 60}ms`, animationFillMode: 'forwards'}}>
                    <div className="bg-obvian-cyan/20 p-1 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-obvian-cyan">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="ml-3 text-obvian-gray/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card border border-cyan-400/10 rounded-2xl shadow-lg p-6 animate-fade-in-up delay-200">
              <h3 className="text-lg font-bold text-white mb-4">Testimonials</h3>
              <ul className="space-y-4">
                {project.testimonials?.map((testimonial, idx) => (
                  <li key={idx} className="animate-fade-in-up" style={{animationDelay: `${300 + idx * 80}ms`, animationFillMode: 'forwards'}}>
                    <blockquote className="text-obvian-gray/90 italic mb-2">“{testimonial.text}”</blockquote>
                    <div className="text-obvian-cyan font-semibold">{testimonial.author}</div>
                    <div className="text-obvian-gray/70 text-sm">{testimonial.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related projects */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white animate-fade-in-up delay-100">Related Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id)
              .filter(p => p.tags.some(tag => project.tags.includes(tag)))
              .slice(0, 3)
              .map((relatedProject, idx) => (
                <div
                  key={relatedProject.id}
                  className="glass-card border border-cyan-400/10 bg-obvian-black/60 rounded-xl overflow-hidden group hover:border-obvian-cyan/50 transition-all animate-fade-in-up"
                  style={{animationDelay: `${100 + idx * 100}ms`, animationFillMode: 'forwards'}}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProject.gallery?.[0]}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obvian-black to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-white">{relatedProject.title}</h3>
                    <p className="text-obvian-gray/80 text-sm mb-4 line-clamp-2">{relatedProject.description}</p>
                    <Link
                      to={`/projects/${relatedProject.id}`}
                      className="text-obvian-cyan flex items-center hover:underline"
                    >
                      View Project
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
