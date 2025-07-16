import React from 'react';

const About = () => {
  return (
    <div className="relative flex flex-col lg:flex-row">
      <div className="lg:w-2/3 w-full py-12 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80">
        <div className="relative p-10 rounded-lg max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-body tracking-tighter">About Magnum Opus</h1>

          <p className="text-lg mb-6 font-body leading-relaxed">
            Welcome to Magnum Opus, the premier marketplace for authentic historic copies of paintings by renowned artists, as well as a platform for artists worldwide to showcase their work.
          </p>

          <h2 className="text-2xl font-semibold mb-4 font-body">Our Objectives</h2>
          <ul className="list-disc list-inside mb-6 font-body leading-relaxed">
            <li>Provide a trustworthy platform for art enthusiasts and collectors.</li>
            <li>Empower artists by giving them a global stage to present their works.</li>
            <li>Preserve and promote the appreciation of classic art pieces.</li>
            <li>Create a seamless and enjoyable shopping experience for art lovers.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 font-body">Our Goals</h2>
          <ul className="list-disc list-inside mb-6 font-body leading-relaxed">
            <li>Expand our artist community to include emerging talents from around the world.</li>
            <li>Collaborate with museums and galleries to bring exclusive collections to our platform.</li>
            <li>Introduce advanced search and recommendation features to help users discover art that resonates with them.</li>
            <li>Ensure the authenticity and quality of every piece sold on our platform.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 font-body">Why Choose Us?</h2>
          <p className="text-lg font-body leading-relaxed">
            At Magnum Opus, we are passionate about art and dedicated to creating a space where artists and art lovers can connect. Our commitment to quality and authenticity sets us apart, making us a trusted destination for anyone looking to purchase or showcase beautiful artwork.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 font-body">Our Location</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.174014127899!2d85.31443831506118!3d27.683477232922373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191f7190e6c3%3A0x9a1bdb981d191f23!2sKupondole%2C%20Lalitpur%2044613%2C%20Nepal!5e0!3m2!1sen!2sus!4v1690986421584!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div
        className="lg:w-1/3 w-full h-full bg-contain bg-center"
        style={{
          backgroundImage: "url('https://lifencolors.in/cdn/shop/products/a2ae29_f5e6bc3e6d1f4f7fae062d3e7225818b_mv2_4f4091df-0898-49db-8248-76858b729fe2.jpg?v=1696588678&width=1946')", // Replace with your background image URL
          height: "170vh",
        }}
      />
    </div>
  );
};

export default About;
