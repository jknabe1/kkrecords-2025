import React from 'react'

export default function FeaturedNews() {
  return (
    <section className="relative mt-10 first-of-type:mt-[calc(theme(spacing.10)_+_theme(spacing.16))] lg:mt-16 mb-10 lg:mb-16">
    <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-3">
                    <Link className="group block" href="">
                      <div className="noise relative aspect-[4/5] lg:aspect-[12/5]">
                        <img draggable="false" alt="Fra forskning til forståelse: Sådan gør Puori deres dokumentation enkel og visuel" loading="lazy" width="1536" height="1920" className="h-full w-full object-cover lg:hidden" sizes="100vw" srcSet="https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=256&amp;h=320&amp;fit=max&amp;auto=format 256w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=384&amp;h=480&amp;fit=max&amp;auto=format 384w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=640&amp;h=800&amp;fit=max&amp;auto=format 640w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=750&amp;h=937&amp;fit=max&amp;auto=format 750w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=828&amp;h=1035&amp;fit=max&amp;auto=format 828w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=1080&amp;h=1350&amp;fit=max&amp;auto=format 1080w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=1200&amp;h=1500&amp;fit=max&amp;auto=format 1200w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=1920&amp;h=2400&amp;fit=max&amp;auto=format 1920w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=2048&amp;h=2560&amp;fit=max&amp;auto=format 2048w, https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=3840&amp;h=4800&amp;fit=max&amp;auto=format 3840w" src="https://cdn.sanity.io/images/4kciagr0/production/e4c1c7866000124008d1e95e1c98dbacdd9d98fa-1920x1080.png?rect=528,0,864,1080&amp;w=3840&amp;h=4800&amp;fit=max&amp;auto=format"/>
                          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-950/50 p-5">
                          <div className="absolute bottom-4 left-4 z-10 flex flex-col items-start gap-1">
                            <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                              <span className="text-[--vividGreen]">■</span> hej
                            </div>
                            <div className="bg-white text-black text-sm px-2 py-1 inline-block">hej</div>
                            <div className="bg-white text-black text-xs px-2 py-1 inline-block">hej</div>
                          </div>
                            </div>
                          </div>
                        </Link>
        </div>
    </div>
</section>
  )
}
