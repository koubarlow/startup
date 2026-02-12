import React from 'react';

export function Journal() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div class="notifications">
        <div class="alert">
          <p>10:39am GMT+9: くりさん read your Jan. 26 journal</p>
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        </div>
        <div class="alert">
          <p>10:36am GMT+9: ポーさん read your Jan. 26 journal</p>
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        </div>
        <div class="alert">
         <p>10:34am GMT+9: 田中さん read your Jan. 25 journal</p>
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        </div>
      </div>
      <div class="newJournalBtn">
        <button>Create Journal Entry</button>
      </div>
      <div class="journalList">
        <div class="card">
          <h3>Jan. 27, 2026</h3>
          <h4>Side Hustles</h4>
          <p>Lately I’ve been thinking a lot about side hustles and how people make extra money outside of their main job. I like my housing, but rent and daily expenses still make me want more financial flexibility. I’ve tried doing small freelance work online, and while it’s tiring after a full day of work, it feels empowering to build something on my own. It also makes me curious about how people in other countries balance multiple jobs and rest.</p>
          <p class="reads">50k reads</p>
        </div>
        <div class="card">
          <h3>Jan. 26, 2026</h3>
          <h4>Burnout</h4>
          <p>This week I felt burned out more than usual. Even though I like my housing and feel comfortable where I live, the routine of work, commuting, and responsibilities can feel heavy. Sometimes I stay inside longer than I should and lose motivation to do things I normally enjoy. Writing this helps me slow down and realize that burnout isn’t just about work—it’s about not giving myself enough mental space.</p>
          <p class="reads">6.3k reads</p>
        </div>
        <div class="card">
          <h3>Jan. 25, 2026</h3>
          <h4>Rising Prices</h4>
          <p>Rising prices have been on my mind recently, especially when I buy groceries or pay monthly bills. I like my housing, but I worry about whether it will stay affordable in the future. Small things cost more than they used to, and it adds quiet stress to everyday decisions. I wonder how people in other countries are coping with inflation and whether they feel the same pressure in their daily lives.</p>
          <p class="reads">12.3k reads</p>
        </div>
        <div class="card">
          <h3>Jan. 24, 2026</h3>
          <h4>Exercise</h4>
          <p>I’ve been trying to exercise more consistently, even if it’s just a short walk or light workout. I like my housing because it’s close to a park, which makes it easier to get outside and move my body. Exercise helps clear my head, especially when I’ve been overthinking or spending too much time on my phone. It reminds me that health is something built from small, everyday habits.</p>
          <p class="reads">24.3k reads</p>
        </div>
      </div>
      <button class="seeMoreBtn">See more</button>
    </main>
  );
}