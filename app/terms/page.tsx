export const metadata = {
  title: "Terms of Service - OMNITOOLS",
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing and using OMNITOOLS, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">2. Use of Service</h2>
              <p>
                You agree to use our tools for lawful purposes only. You must not use the 
                service to transmit any malicious code or engage in any activity that 
                disrupts the service for others.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">3. Disclaimer of Warranties</h2>
              <p>
                The tools are provided &ldquo;as is&rdquo; without warranty of any kind. While we strive 
                for accuracy, we are not responsible for any errors in calculations or 
                conversions produced by our tools.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">4. Modifications</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, 
                the service with or without notice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
