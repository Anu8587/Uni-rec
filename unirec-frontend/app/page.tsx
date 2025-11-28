export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">UniRecAI Demo</h1>
      <p className="text-lg text-gray-300 mb-8">
        A Universal Personalisation Engine Demo
      </p>

      <a
        href="/demo"
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Open Demo
      </a>
    </main>
  );
}
