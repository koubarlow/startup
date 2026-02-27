import React, { useState } from "react";
import userData from './users.json';

export function JournalDetailModal({journal, setShowJournalDetail}) {

    const journalTopic = journal.topic;
    const journalEntryText = journal.entry;
    const journalUser = userData.users.find(user => user.userId === journal.userId);
    const journalUsername = journalUser.username;

    const englishText = `
        I live in an apartment. Every day, I go about my life surrounded by a quiet and calm atmosphere. There is very little noise in the mornings or at night, so it’s an environment where I can truly value my own time. Since it’s located a little away from the main road, I’m hardly ever bothered by the sounds of cars or people talking. When I open the window, I can sometimes hear birds chirping in the distance, and starting my day while listening to that sound makes me feel very peaceful.
        In the morning, soft light filters in through the gaps in the curtains, and I wake up naturally. Because there’s no rush of noisy commotion, I can slowly get ready and enjoy some quiet time while drinking a warm beverage. The outside air is clear, and when I step out onto the balcony and take a deep breath, it feels as though even my heart is refreshed. Even on busy days, having this quiet time in the morning allows me to start the day feeling calm and composed.
        The evenings are peaceful in the same way. When I return home after finishing work or errands, a quiet and comforting space awaits me inside my room. I’m rarely bothered by the sounds of others, and I can spend my personal time leisurely—reading a book or playing music softly in the background. Because it’s so quiet outside, it’s easier to listen to my inner thoughts. I can reflect on the events of the day and think about my goals for the future.
        Living in this apartment has become very important to me. It may not be flashy or exciting, but in return, it offers a steady sense of security and comfort. Thanks to the quiet environment, I can focus on studying and hobbies, and I’m able to set aside meaningful time to face myself. The ordinary moments of each day feel pleasant, and I want to continue cherishing the time I spend here.
        `;
    const japaneseText = `
        アパートに住んでいます。毎日、周りが静かで落ち着いた雰囲気を感じながら生活しています。朝や夜もあまり騒音がなく、自分の時間を大切にできる環境です。大通りから少し離れていることもあって、車の音や人の話し声が気になることはほとんどありません。窓を開けると、遠くで鳥のさえずりが聞こえることもあり、その音を聞きながら一日を始めると、とても穏やかな気持ちになります。
        朝はカーテンの隙間からやわらかい光が差し込み、自然に目が覚めます。急かされるような騒がしさがないので、ゆっくりと身支度を整え、温かい飲み物を飲みながら静かな時間を楽しむことができます。外の空気も澄んでいて、ベランダに出て深呼吸をすると、心までリフレッシュされるように感じます。忙しい日でも、この静かな朝の時間があるおかげで、落ち着いた気持ちで一日をスタートすることができます。
        夜も同じように穏やかです。仕事や用事を終えて帰宅すると、部屋の中は静かで安心できる空間が広がっています。周囲の生活音もほとんど気にならず、本を読んだり、音楽を小さな音で流したりしながら、自分だけの時間をゆったりと過ごせます。外が静かだからこそ、心の中の声にも耳を傾けやすくなり、その日あった出来事を振り返ったり、これからの目標について考えたりすることができます。
        このアパートでの生活は、私にとってとても大切なものになっています。派手さや刺激はないかもしれませんが、その分、安定した安心感があります。静かな環境のおかげで、集中して勉強や趣味に取り組むこともでき、自分自身と向き合う時間をしっかり確保できています。毎日の何気ない瞬間が心地よく、ここで過ごす時間をこれからも大切にしていきたいと感じています。
        `;

    const [isTranslated, setIsTranslated] = useState(false);

    function toggle() {
        setShowJournalDetail(prev => !prev);
    }

    return(
    <div id="journalModal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                    <h3 className="text-lg font-medium text-heading">
                        {journalTopic} - {journalUsername}
                    </h3>
                    <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="top-left-modal">
                        <svg className="w-5 h-5" onClick={toggle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                  <p className="leading-relaxed text-body">{isTranslated ? englishText : journalEntryText}</p>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                    <button data-modal-hide="top-left-modal" onClick={() => setIsTranslated(prev => !prev)} type="button" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Translate</button>
                    <button data-modal-hide="top-left-modal" onClick={toggle} type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}