export const metadata = {
  title: "Privacy Policy - OMNITOOLS",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">1. Information We Collect</h2>
              <p>
                We minimize data collection. Most tools run locally in your browser. We do not store 
                the input data or results of these tools. We collect basic analytical data 
                (like which pages are visited) to improve our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">2. Browser Storage</h2>
              <p>
                We use local storage and cookies to remember your preferences and provide 
                features like &ldquo;Favorite Tools&rdquo; or &ldquo;Recent History&rdquo;. This data stays on your 
                device unless you clear your browser data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">3. Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your 
                information. All communication with our servers is encrypted via SSL/TLS.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">4. Contact Us</h2>
              <p>
                If you have any questions regarding this privacy policy, you may contact us 
                using the information on our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
