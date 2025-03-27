import Link from "next/link";

const InfoGrid = () => {
  const items = [
    { title: "Kontakta oss", link: "/om-oss/kontakta-oss/" },
    { title: "Så arbetar vi", link: "/how-we-work" },
    { title: "Medierum", link: "/media-room" },
    { title: "Publikationer", link: "/publications" },
    { title: "Jobba hos oss", link: "/careers" },
    { title: "Integritet", link: "/om-oss/integritet" },
    { title: "Tillgänlighet", link: "/om-oss/tillganglighet" },
    { title: "Våra kontor", link: "/om-oss/vara-kontor"},
    { title: "Music For Pennies", link: "/om-oss/music-for-pennies" },
  ];

  return (
    <div className="px-2 py-3 lg:px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Link key={index} href={item.link} className="group">
              <div className="hover:bg-black hover:text-white border border-black border-solid p-6 flex items-center justify-between transition-transform duration-200 hover:italic">
                <span className="text-lg leading-relaxed">{item.title}</span>
                <span className="text-lg leading-relaxed transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;