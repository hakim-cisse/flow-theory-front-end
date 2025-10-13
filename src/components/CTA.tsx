export const CTA = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Ready to work <span className="text-gradient">smarter</span>, not harder?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's identify how AI can revolutionize your business one system at a time.
            </p>
          </div>

          <div className="w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-card bg-card">
            <iframe
              src="https://cal.com/hakim-cisse/alignment-call"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Book Your Alignment Call"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
