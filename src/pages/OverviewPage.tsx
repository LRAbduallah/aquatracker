import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  BookOpen, 
  Users, 
  MapPin, 
  Database, 
  Microscope,
  FileText,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function OverviewPage() {
  const navigate = useNavigate();

  const projectGoals = [
    {
      icon: Database,
      title: 'Digital Preservation',
      description: 'Create a comprehensive digital repository for algae specimens and research data'
    },
    {
      icon: BookOpen,
      title: 'Academic Reference',
      description: 'Establish a reliable resource for students, researchers, and botanical studies'
    },
    {
      icon: MapPin,
      title: 'Geographic Documentation',
      description: 'Map and track algae distribution across various collection sites'
    },
    {
      icon: Users,
      title: 'Collaborative Research',
      description: 'Facilitate collaborative work among research scholars and faculty'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Field Collection',
      description: 'Systematic collection of algae specimens from diverse aquatic environments'
    },
    {
      step: '02', 
      title: 'Laboratory Analysis',
      description: 'Microscopic examination and taxonomic identification of collected specimens'
    },
    {
      step: '03',
      title: 'Digital Documentation',
      description: 'Photographic documentation and data entry into the digital archive'
    },
    {
      step: '04',
      title: 'Academic Review',
      description: 'Validation and review of data under faculty supervision'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Project Overview
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive digital initiative to catalog, preserve, and study algae specimens 
            for academic and research purposes.
          </p>
        </div>

        {/* Academic Context */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                Academic Purpose
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                This project compiles algae-related data for academic reference and departmental activities 
                within the Department of Botany at S.T. Hindu College, Nagercoil. The initiative serves as 
                both a learning platform for students and a research resource for faculty members.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Under the Guidance of:</h4>
                <p className="text-muted-foreground">
                  <strong>Dr. M. Mathevan Pillai</strong><br />
                  Associate and Head, Department of Botany<br />
                  S.T. Hindu College, Nagercoil
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Project Goals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Project Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectGoals.map((goal, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <goal.icon className="h-5 w-5 text-white" />
                    </div>
                    {goal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Research Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((method, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{method.step}</span>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Scope and Impact */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  Scope of Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Collection and identification of freshwater and marine algae
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Morphological and taxonomic analysis of specimens
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Digital photography and documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Geographic mapping of collection sites
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Database creation and maintenance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Microscope className="h-6 w-6 text-primary" />
                  Academic Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Enhanced learning resources for botany students
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Research foundation for graduate studies
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Contribution to regional biodiversity records
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Support for taxonomy and systematics studies
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Platform for collaborative research
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">Explore Our Research</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Dive into our growing collection of algae specimens and contribute to advancing botanical knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/algae')}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Database className="h-5 w-5 mr-2" />
                  Browse Collection
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/about')}
                  className="border-white text-white hover:bg-white/10"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Meet Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}