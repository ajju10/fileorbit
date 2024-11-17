import { ArrowRight, Cloud, Folders } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const features = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Connect Storage",
      description: "Link all your Google Drive accounts in one place",
    },
    // {
    //   icon: <Search className="w-6 h-6" />,
    //   title: "Find Anything",
    //   description: "Search across all your connected storage providers instantly"
    // },
    {
      icon: <Folders className="w-6 h-6" />,
      title: "Manage Simply",
      description: "Access and organize your files through a single dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="border-b-2">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold text-indigo-900">FileOrbit</span>
            <Link
              href="/sign-in"
              className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            All Your Cloud Storage in One Place
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-xl mx-auto">
            Connect your existing cloud storage providers and manage all your files from a single
            dashboard.
          </p>
          <Link
            href="/sign-up"
            className="bg-indigo-900 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-800 inline-flex items-center"
          >
            Try FileOrbit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border-2 bg-slate-50 p-6 rounded-lg">
                <div className="text-indigo-900 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*<div className="max-w-5xl mx-auto px-4 py-20">*/}
      {/*  <div className="bg-indigo-900 rounded-xl text-center px-6 py-12">*/}
      {/*    <h2 className="text-2xl font-bold text-white mb-4">*/}
      {/*      Ready to Simplify Your File Management?*/}
      {/*    </h2>*/}
      {/*    <button className="bg-white text-indigo-900 px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50">*/}
      {/*      Get Started Now*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <footer className="border-t-2">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <div>© 2024 FileOrbit</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-900">
                Terms
              </a>
              <a href="#" className="hover:text-slate-900">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
