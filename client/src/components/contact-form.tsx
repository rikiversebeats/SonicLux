import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  timeline: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      projectType: "",
      budget: "",
      message: "",
      timeline: ""
    }
  });

  const projectTypes = [
    { value: "music-production", label: "Music Production" },
    { value: "mixing-mastering", label: "Mixing & Mastering" },
    { value: "sound-design", label: "Sound Design" },
    { value: "podcast-production", label: "Podcast Production" },
    { value: "audio-branding", label: "Audio Branding" },
    { value: "live-recording", label: "Live Recording" },
    { value: "consultation", label: "Consultation" },
    { value: "other", label: "Other" }
  ];

  const budgetRanges = [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k-50k", label: "$15,000 - $50,000" },
    { value: "50k-plus", label: "$50,000+" },
    { value: "discuss", label: "Let's Discuss" }
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-month", label: "Within 1 Month" },
    { value: "3-months", label: "Within 3 Months" },
    { value: "6-months", label: "Within 6 Months" },
    { value: "flexible", label: "Flexible" }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#", color: "hover:text-pink-400" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#", color: "hover:text-blue-600" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#", color: "hover:text-red-500" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#", color: "hover:text-blue-700" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Start Your Project
            </CardTitle>
            <p className="text-muted-foreground">
              Tell us about your vision and let's create something extraordinary together.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    className="bg-dark-surface border-border"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className="bg-dark-surface border-border"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+1 (555) 123-4567"
                    className="bg-dark-surface border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder="Project inquiry..."
                    className="bg-dark-surface border-border"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select onValueChange={(value) => setValue("projectType", value)}>
                    <SelectTrigger className="bg-dark-surface border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-sm text-red-500">{errors.projectType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select onValueChange={(value) => setValue("budget", value)}>
                    <SelectTrigger className="bg-dark-surface border-border">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(budget => (
                        <SelectItem key={budget.value} value={budget.value}>
                          {budget.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select onValueChange={(value) => setValue("timeline", value)}>
                    <SelectTrigger className="bg-dark-surface border-border">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map(timeline => (
                        <SelectItem key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Project Description *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  rows={6}
                  className="bg-dark-surface border-border resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="luxury-button w-full text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        {/* Contact Details */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-muted-foreground">rikivaultstudios@gmail.com</p>
                <p className="text-muted-foreground">projects@rikivault.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Studio Location</p>
                <p className="text-muted-foreground">
                  123 Music District<br />
                  Los Angeles, CA 90028<br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Studio Hours</p>
                <p className="text-muted-foreground">
                  Mon - Fri: 9:00 AM - 8:00 PM<br />
                  Saturday: 10:00 AM - 6:00 PM<br />
                  Sunday: By Appointment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Follow Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`border-border hover:border-primary ${social.color} transition-all duration-300 aspect-square p-0`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Badge variant="outline" className="border-primary text-primary">
                Follow for Latest Updates
              </Badge>
              <p className="text-sm text-muted-foreground">
                Stay connected for behind-the-scenes content, new releases, and exclusive previews.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Response */}
        <Card className="luxury-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-primary text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We typically respond to inquiries within 24 hours during business days.
              </p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Average Response: 4 hours
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
