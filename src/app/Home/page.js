"use client";
import Link from "next/link";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-10 text-center">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to CodeCollab</h1>
            <p className="mt-4 text-gray-100 text-lg">Collaborate on code in real time with your team.</p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
                {/* <Link href="/dashboard">
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Go to Dashboard
                    </button>
                </Link> */}

                {/* <Link href="/admin">
                    <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Admin Panel
                    </button>
                </Link> */}

                <Link href="/">
                    <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                        Open Workspace
                    </button>
                </Link>
            </div>
        </main>
    );
}