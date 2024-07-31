<script>

  import Card from '../card/form.svelte';

  const ADD_CARD = "__add_card__";

  export let value;

  $: if(!value) value = [
    {image:null, body:''}
  ];

  let screen = 0;
  let count = Math.ceil(((value?.length || 0) + 1) / 4);
  
  $: display = [...(value || []), ADD_CARD];
  
  const next = () => {
    screen = screen == count ? 0 : screen + 1;
  };

  const prev = () => {
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

</script>



<div class="se-card-carousel">
  <button class="se-card-carousel__prev" on:click={prev}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z"/></svg>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM297 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L120 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L409 239c9.4 9.4 9.4 24.6 0 33.9L297 385z"/></svg>
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
    fill: var(--se-forground, #424242);
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
    z-index: 10;
    max-width: 280px;
    scroll-snap-align: center;
  }

  .se-card-carousel__item:has(:focus) {
    z-index: 100;
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
    fill: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
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
    fill: var(--se-forground, #424242);
  }

</style>