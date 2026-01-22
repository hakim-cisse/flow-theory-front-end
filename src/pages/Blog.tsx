import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { createBlogPath } from "@/lib/slug";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbSchema, BlogListingSchema } from "@/components/StructuredData";

// Import author images
import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";

const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";
const SITE_URL = "https://www.flowtheoryai.com";

// Map author names to their local images
const authorImages: Record<string, string> = {
  "Hakim Cisse": hakimImage,
  "Yassine Diallo": yassineImage,
  "Yunus Kounkourou": yunusImage,
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  content?: object;
  author: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  limit: number;
  offset: number;
}

const getAuthorInitials = (name: string | null) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAuthorImage = (author: BlogPost["author"]): string | undefined => {
  if (!author?.display_name) return undefined;
  return authorImages[author.display_name] || author.avatar_url || undefined;
};

const Blog = () => {
  const [contactOpen, setContactOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=50&offset=0`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json() as Promise<BlogListResponse>;
    },
  });

  const blogs = data?.posts || [];

  const breadcrumbItems = [{ label: "Blog" }];
  const breadcrumbSchemaItems = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog"
        description="Insights, strategies, and case studies from the Flow Theory AI team. Learn about AI automation, business transformation, and workflow optimization."
        canonicalUrl={`${SITE_URL}/blog`}
        ogTitle="Flow Theory AI Blog"
        ogDescription="Insights, strategies, and case studies from the Flow Theory AI team."
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <BlogListingSchema />
      
      <Header onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="container mx-auto max-w-6xl">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Insights, strategies, and case studies from the Flow Theory AI team.
            </p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <section className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Failed to load blog posts. Please try again later.
              </p>
            </section>
          ) : blogs.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  to={createBlogPath(blog.id, blog.title)}
                  title={blog.title}
                >
                  <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col">
                    {blog.cover_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {blog.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={getAuthorImage(blog.author)}
                            alt={blog.author?.display_name || "Author"}
                          />
                          <AvatarFallback>
                            {getAuthorInitials(blog.author?.display_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {blog.author?.display_name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <time dateTime={blog.published_at}>
                              {format(new Date(blog.published_at), "MMM d, yyyy")}
                            </time>
                            {blog.content && (
                              <>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" aria-hidden="true" />
                                  {formatReadingTime(calculateReadingTime(blog.content))}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex-1">
                      {blog.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </section>
          ) : (
            <section className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </section>
          )}
        </article>
      </main>

      <Footer onContactClick={() => setContactOpen(true)} />
    </div>
  );
};

export default Blog;
