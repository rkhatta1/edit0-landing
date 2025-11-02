export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <p className="text-2xl font-bold">Edit0 (Edit-Zero)</p>
          <p className="mt-[1rem] text-md text-balance text-gray-200">An agnetic video editing copilot that processes multi-cam, multi-audio files, in real-time and creates an EDL / fcpxml file. From raw footage to a ready-to-render timeline - an end-to-end agentic pipeline that understands context, conversations, speakers and visual cues to create the ideal zero-th edit.</p>
          <p className="mt-8 flex">
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=%23ffffff&logoSize=auto" /></span>
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=%23ffffff&logoSize=auto" /></span>
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/Gemini-8E75B2?style=flat&logo=googlegemini&logoColor=%23ffffff&logoSize=auto" /></span>
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/HuggingFace-040404?style=flat&logo=huggingface&logoColor=%23FFD21E&logoSize=auto" /></span>
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/Google Cloud-4285F4?style=flat&logo=googlecloud&logoColor=%23ffffff&logoSize=auto" /></span>
            <span style={{ width: "auto", marginRight: "0.5rem" }}><img alt="Static Badge" src="https://img.shields.io/badge/apple/FastVLM-FFFFFF?style=flat&logo=apple&logoColor=%23000000&logoSize=auto" /></span>
            
          </p>
          <p className="mt-8 text-[1.3rem] font-semibold text-gray-200">The progress so far:</p>
          <ul className="mt-4 pl-5 list-['-___'] flex flex-col space-y-1">
            <li className="text-gray-500 line-through">Set up apple/FastVLM.</li>
            <li className="text-gray-500 line-through">Scaffold a local pipeline.</li>
            <li className="text-gray-500 line-through">Set up memory beyond a vector db.</li>
            <li className="text-gray-500 line-through">Implement speaker diarization.</li>
            <li className="text-gray-500 line-through">MVP pipeline for multi-cam post processing.</li>
            <li className="text-white animate-[pulse_3s_ease-in-out_infinite] ">Agent #0 for automated config.</li>
            <li className="text-gray-200">Real-time audio / video feed testing and configuration.</li>
            <li className="text-gray-200">Performance optimization, token caching etc.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
