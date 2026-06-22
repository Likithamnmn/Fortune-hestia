export default function CTA() {
  return (
    <section className="relative h-[80vh]">

      <img
        src="/images/cta.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        alt=""
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="text-center">

          <h2 className="font-serif text-6xl text-white">
            Discover Luxury Living
          </h2>

          <button className="mt-10 bg-[#c6a76a] px-8 py-4">
            Book Site Visit
          </button>

        </div>

      </div>

    </section>
  );
}