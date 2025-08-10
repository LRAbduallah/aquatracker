import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Microscope, 
  Database, 
  MapPin, 
  Users, 
  BookOpen, 
  Search,
  FileText,
  ChevronRight,
  Leaf
} from 'lucide-react';
import algaeHeroBg from '@/assets/algae-hero-bg.jpg';

export default function HomePage() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Browse Catalog',
      description: 'Explore algae specimens in our digital collection',
      icon: Database,
      href: '/algae',
      color: 'bg-gradient-primary'
    },
    {
      title: 'Collection Map',
      description: 'View collection sites on interactive map',
      icon: MapPin,
      href: '/map',
      color: 'bg-gradient-secondary'
    },
    {
      title: 'Dashboard',
      description: 'Access research tools and analytics',
      icon: BookOpen,
      href: '/dashboard',
      color: 'bg-primary'
    },
    {
      title: 'About Project',
      description: 'Learn about our research methodology',
      icon: FileText,
      href: '/about',
      color: 'bg-accent'
    }
  ];

  const features = [
    {
      icon: Microscope,
      title: 'Scientific Research',
      description: 'Comprehensive algae specimen documentation and analysis'
    },
    {
      icon: Database,
      title: 'Digital Archive',
      description: 'Organized database for academic reference and study'
    },
    {
      icon: MapPin,
      title: 'Location Mapping',
      description: 'Geographic tracking of collection sites and habitats'
    },
    {
      icon: Users,
      title: 'Collaborative Work',
      description: 'Multi-researcher data collection and validation'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{ backgroundImage: `url(${algaeHeroBg})` }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/images/college-logo.png" 
                alt="S.T. Hindu College Logo" 
                className="h-16 w-auto mr-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground">S.T. Hindu College</h2>
                <p className="text-sm text-muted-foreground">Department of Botany</p>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              AquaTracker
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
              Algae Research Data Archive
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              This platform serves as a digital space for organizing and sharing algae-related data collected as part of ongoing academic activities in the Department of Botany.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-lg transition-all duration-200"
                onClick={() => navigate('/algae')}
              >
                <Search className="h-5 w-5 mr-2" />
                Explore Collection
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:bg-muted"
                onClick={() => navigate('/overview')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access key sections of the research archive and analytical tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-border/50 hover:-translate-y-1"
                onClick={() => navigate(action.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <div className="flex items-center justify-center text-primary group-hover:text-accent transition-colors">
                    <span className="text-sm font-medium">Access</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Research Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and methodologies for algae research and documentation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Context */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Academic Excellence</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Under the guidance of <strong>Dr. M. Mathevan Pillai</strong>, Associate and Head of the Department of Botany, 
              this research initiative represents our commitment to advancing botanical sciences and contributing to 
              the academic understanding of algae diversity and distribution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Research Supervision</h4>
                <p className="text-sm text-muted-foreground">Dr. M. Mathevan Pillai</p>
                <p className="text-xs text-muted-foreground">Associate & Head, Dept. of Botany</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Institution</h4>
                <p className="text-sm text-muted-foreground">S.T. Hindu College</p>
                <p className="text-xs text-muted-foreground">Nagercoil</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Research Focus</h4>
                <p className="text-sm text-muted-foreground">Algae Documentation</p>
                <p className="text-xs text-muted-foreground">& Taxonomic Studies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}