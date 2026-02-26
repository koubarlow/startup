import React from 'react';

export function Explore() {
  return (
    <main>
      <div id="journalModal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                    <h3 className="text-lg font-medium text-heading">
                        Housing - 🇯🇵 晃くん
                    </h3>
                    <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="top-left-modal">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                  <p className="leading-relaxed text-body">
                      アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。大通りから少し離れていることもあって、車の音や人の話し声が気になることはほとんどありません。窓を開けると、遠くで鳥のさえずりが聞こえることもあり、その音を聞きながら一日を始めると、とても穏やかな気持ちになります。
                      朝はカーテンの隙間からやわらかい光が差し込み、自然に目が覚めます。急かされるような騒がしさがないので、ゆっくりと身支度を整え、温かい飲み物を飲みながら静かな時間を楽しむことができます。外の空気も澄んでいて、ベランダに出て深呼吸をすると、心までリフレッシュされるように感じます。忙しい日でも、この静かな朝の時間があるおかげで、落ち着いた気持ちで一日をスタートすることができます。
                  </p>
                  <p className="leading-relaxed text-body">
                        夜も同じように穏やかです。仕事や用事を終えて帰宅すると、部屋の中は静かで安心できる空間が広がっています。周囲の生活音もほとんど気にならず、本を読んだり、音楽を小さな音で流したりしながら、自分だけの時間をゆったりと過ごせます。外が静かだからこそ、心の中の声にも耳を傾けやすくなり、その日あった出来事を振り返ったり、これからの目標について考えたりすることができます。
                        このアパートでの生活は、私にとってとても大切なものになっています。派手さや刺激はないかもしれませんが、その分、安定した安心感があります。静かな環境のおかげで、集中して勉強や趣味に取り組むこともでき、自分自身と向き合う時間をしっかり確保できています。毎日の何気ない瞬間が心地よく、ここで過ごす時間をこれからも大切にしていきたいと感じています。
                  </p>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                    <button data-modal-hide="top-left-modal" type="button" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Translate</button>
                    <button data-modal-hide="top-left-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Close</button>
                </div>
            </div>
        </div>
    </div>

      <h1>Explore</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Housing</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇯🇵 晃くん</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Work Stress</h5>
            <p className="text-body mb-6">14.7k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇺🇸 Timothy Dale</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Cost of Living</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇺🇸 Dylan Cook</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Daily Life</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇯🇵 田中さん</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Emotional Well-being</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇯🇵 ポーさん</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Weather</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇨🇦 Yanny Bokes</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Pop Music</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇲🇲 Min</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">K-Pop Demon Hunters</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇰🇷 Sung Hung</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">University</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇯🇵 桜</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Pho Noodles</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇺🇸 Joanna Barlow</p>
        </div>
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Surfing</h5>
            <p className="text-body mb-6">20.4k</p>
          </div>
          <p className="text-body mb-6">アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。</p>
          <p className="font-semibold float-right">🇦🇺 Joseph Jeffrey</p>
        </div>
      </div>
  
      <div className="modal">
        <div className="card">
          <h2>🇯🇵 晃くん's Journal - Jan. 27, 2026</h2>
          <h3>Housing</h3>
          <p>アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。
              朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。

              部屋の大きさはあまり広くなく、少し狭いと感じることもありますが、その分掃除はしやすいです。
              窓からは小さな公園を見ることができ、天気のいい日は子どもたちが遊んでいる様子が見えます。
              その景色を見ると、気持ちが少し和らぎます。

              家賃は70000円で、毎月の支払いを工夫しながら生活しています。
              無駄な出費を減らしたり、食費を考えたりして、できるだけ節約するようにしています。

              近所にはスーパーや図書館があり、とても便利です。
              スーパーは歩いて行ける距離にあり、図書館では静かな時間を過ごすことができます。

              もし可能なら、将来はもっと広い公園の近くに住みたいです。
              自然が多く、散歩ができる場所があると、今よりもっとリラックスできると思います。

              今日の気持ちはとても落ち着いています。
              静かな生活のおかげで、心が安定していると感じます。
          </p>
          <a href="explore.html">Translate</a>
        </div>
      </div>
    </main>
  );
}