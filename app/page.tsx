import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl bg-white px-8 pb-20 pt-12">
      <section className="max-w-3xl">
        <h1 className="text-7xl font-semibold leading-[1.08] tracking-tight text-black">
          Train Like a Pro.
          <br />
          Win Like a
          <br />
          Legend.
        </h1>
        <p className="mt-7 h-[77px] w-[619px] text-[20px] font-normal leading-relaxed text-neutral-800">
          Stop practicing on your prospects. Use our AI buyers to master
          objection handling, perfect your pitch, and build the muscle memory
          needed to close the hardest deals in your pipeline.
        </p>
        <Link
          href="/simulators"
          className="mt-8 inline-flex rounded-md bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-amber-600"
        >
          Practice Your First Call
        </Link>
        <Link
        href="sign-in"
        className="mt-8 inline-flex rounded-md underline text-black  px-6 py-3 tranisition delay-50 duration-200 ease-in-out hover:-translate-y-0.5 hover: scale-100 "
        >
          Already a customer? Sign in!
        </Link>
      </section>
      
    </main>
  );
}
