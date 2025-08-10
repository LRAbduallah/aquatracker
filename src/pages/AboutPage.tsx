import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Microscope, 
  GraduationCap, 
  MapPin, 
  Mail,
  Phone,
  ExternalLink,
  Beaker,
  BookOpen,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Saravanvel R',
      role: 'Research Scholar',
      focus: 'Taxonomic Classification'
    },
    {
      name: 'Ramisha S',
      role: 'Research Scholar', 
      focus: 'Field Collection & Documentation'
    },
    {
      name: 'Juwairiya Nasreen. J',
      role: 'Research Scholar',
      focus: 'Digital Archive Management'
    }
  ];

  const facilities = [
    {
      icon: Microscope,
      title: 'Microscopy Lab',
      description: 'Advanced optical microscopes for detailed algae examination and identification'
    },
    {
      icon: Beaker,
      title: 'Specimen Preparation',
      description: 'Dedicated space for sample preparation and preservation techniques'
    },
    {
      icon: BookOpen,
      title: 'Research Library',
      description: 'Comprehensive botanical literature and taxonomic references'
    },
    {
      icon: MapPin,
      title: 'Field Equipment',
      description: 'GPS devices and collection tools for accurate site documentation'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            About Our Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn about the dedicated team and facilities behind the AquaTracker algae research initiative.
          </p>
        </div>

        {/* Department Information */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building className="h-6 w-6 text-primary" />
                Department of Botany
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">About the Department</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Department of Botany at S.T. Hindu College has been at the forefront of botanical 
                    research and education for several decades. Our department is committed to advancing 
                    the understanding of plant sciences through comprehensive research programs and 
                    innovative teaching methodologies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With state-of-the-art facilities and experienced faculty, we provide students with 
                    hands-on experience in various aspects of botanical sciences, from basic plant biology 
                    to advanced research in specialized fields like algae taxonomy and ecology.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src="/images/college-logo.png" 
                      alt="S.T. Hindu College Logo" 
                      className="h-12 w-auto mr-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">S.T. Hindu College</h4>
                      <p className="text-sm text-muted-foreground">Nagercoil</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Nagercoil, Tamil Nadu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Department of Botany</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Faculty Supervision */}
        <section className="mb-16">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="py-8">
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Faculty Supervision</h2>
                <h3 className="text-2xl font-semibold mb-2">Dr. M. Mathevan Pillai</h3>
                <p className="text-xl text-white/90 mb-4">
                  Associate and Head, Department of Botany
                </p>
                <p className="text-white/80 leading-relaxed">
                  Under the expert guidance of Dr. M. Mathevan Pillai, this research project represents 
                  a significant contribution to the field of algae taxonomy and documentation. His extensive 
                  experience in botanical sciences and commitment to research excellence ensures the highest 
                  standards of scientific rigor in our work.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Research Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Research Scholars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <strong>Focus:</strong> {member.focus}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground italic">
              Department of Botany, S.T. Hindu College, Nagercoil
            </p>
          </div>
        </section>

        {/* Lab Facilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Research Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <facility.icon className="h-5 w-5 text-white" />
                    </div>
                    {facility.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Methodology */}
        <section className="mb-16">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Microscope className="h-6 w-6 text-primary" />
                Research Methodology & Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our research employs systematic collection and analysis techniques using modern equipment 
                and established protocols. The team utilizes both field and laboratory methods to ensure 
                comprehensive documentation of algae specimens.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Field Work</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• GPS-enabled site mapping</li>
                    <li>• Standardized collection protocols</li>
                    <li>• Environmental parameter recording</li>
                    <li>• Digital photography of habitats</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Laboratory Analysis</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Microscopic examination</li>
                    <li>• Taxonomic identification</li>
                    <li>• Morphological documentation</li>
                    <li>• Digital archive creation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-muted/50 border-border/50">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">Explore Our Work</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover the results of our collaborative research efforts and contribute to the advancement 
                of algae taxonomy and documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/overview')}
                  className="bg-gradient-primary hover:shadow-lg transition-all duration-200"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Project Overview
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/algae')}
                  className="border-border hover:bg-muted"
                >
                  <Microscope className="h-5 w-5 mr-2" />
                  Browse Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}