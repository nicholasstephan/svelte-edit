<script>

  import Card from '../card/form.svelte';

  const ADD_CARD = "__add_card__";
  const NEXT = "next";
  const PREV = "prev";

  export let value;

  $: if(!value) value = [
    {image:null, body:''}
  ];

  let screen = 0;
  let count = Math.ceil(((value?.length || 0) + 1) / 4);
  
  $: display = [...(value || []), ADD_CARD];
  
  const next = () => {
    console.log('next');
    screen = screen == count ? 0 : screen + 1;
  };

  const prev = () => {
    console.log('prev');
    screen = screen == 0 ? count : screen - 1;
  };

  const add = () => {
    if(!value) {
      value = [];
    }
    if(!Array.isArray(value)) {
      value = [value];
    }
    value = [...value, {image:null, body:''}];
  };

  const remove = (item) => () => {
    value = value.filter((i) => i != item);
  };

  $: console.log('len', display.length)
  $: console.log('display', display);


</script>



<div class="se-card-carousel">
  <button class="se-card-carousel__prev" on:click={prev}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z"/></svg>
  </button>
  {#each Array(Math.ceil(display?.length / 4)) as _, i}
    <div class="se-card-carousel__screen" class:se-card-carousel__screen--active={i == screen}>
      {#each Array(4) as _, j}
        {#if display[i*4+j] == ADD_CARD}
          <div class="se-card-carousel__item">
            <button on:click={add} class="se-card-carousel__add se-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            </button>
          </div>
        {:else if display[i*4+j]}
          <div class="se-card-carousel__item">
            <Card bind:value={display[i*4+j]}/>
            {#if display.length > 2}
              <button on:click={remove(display[i*4+j])} class="se-card-carousel__item__remove">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
              </button>
            {/if}
          </div>
        {:else}
          <div class="se-card-carousel__spacer">
          </div>
        {/if}
      {/each}
    </div>
  {/each}
  <button class="se-card-carousel__next" on:click={next}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm395.3 11.3l-112 112c-4.6 4.6-11.5 5.9-17.4 3.5s-9.9-8.3-9.9-14.8l0-64-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-64c0-6.5 3.9-12.3 9.9-14.8s12.9-1.1 17.4 3.5l112 112c6.2 6.2 6.2 16.4 0 22.6z"/></svg>
  </button>
</div>


<style>
  
  .se-card-carousel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
    width: 100%;
    padding: 0 15vw;
    overflow: auto;

    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
  }

  .se-card-carousel__prev, 
  .se-card-carousel__next {
    display: none;
    border: none;
    background: none;
    cursor: pointer;
  }

  .se-card-carousel__prev svg, 
  .se-card-carousel__next svg {
    width: 40px;
    fill: var(--se-dark, #424242);
    pointer-events: none;
  }

  .se-card-carousel__screen {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    max-width: 1000px;
    gap: 1rem;
    padding: 1rem 0;
  }

  .se-card-carousel__item {
    position: relative;
    max-width: 280px;
    scroll-snap-align: center;
  }

  .se-card-carousel__spacer {
    display: none;
  }

  @media (min-width: 1200px) {
    .se-card-carousel {
      justify-content: center;
      padding: 0;
    }

    .se-card-carousel__screen {
      grid-template-columns: repeat(4, 1fr);
    }

    .se-card-carousel__screen:not(.se-card-carousel__screen--active) {
      display: none;
    }

    .se-card-carousel__next, 
    .se-card-carousel__prev {
      display: block;
    }

    .se-card-carousel__item {
      width: 240px;
    }

    .spacer {
      display: block;
    }
  }

  @keyframes slide-in-next {
    from {
      transform: translateX(40px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  @keyframes slide-in-prev {
    from {
      transform: translateX(-40px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  .anim-next.active {
    animation: slide-in-next .5s;
  }

  .anim-prev.active {
    animation: slide-in-prev .5s;
  }

  .se-card-carousel__add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%; 
    height: 100%;
    min-height: 196px;

    border: none;

    cursor: pointer;
  }

  .se-card-carousel__add svg {
    width: 40px;
    fill: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-dark, #424242) 20%);
    pointer-events: none;
  }

  .se-card-carousel__item__remove {
    position: absolute;
    top: 8px;
    right: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 32px;
    width: 32px;
    padding: 0;
    border: none;

    text-align: center;
    background: var(--se-background, #eeeeee);

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 16px;

    cursor: pointer;
  }

  .se-card-carousel__item__remove svg {
    height: 16px;
    fill: var(--se-dark, #424242);
  }

</style>