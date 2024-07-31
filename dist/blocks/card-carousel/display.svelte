<script>

  import Card from '../card/display.svelte';

  const NEXT = "next";
  const PREV = "prev";

  export let value;

  $: if(!value) value = [
    {image:null, body:''}
  ];

  let screen = 0;
  let count = Math.ceil((value?.length || 1) / 4);
  let direction = null;
  
  const next = () => {
    screen = screen == count - 1 ? 0 : screen + 1;
    direction = NEXT;
  };

  const prev = () => {
    screen = screen == 0 ? count - 1 : screen - 1;
    direction = PREV;
  };


</script>



<div class="se-card-carousel">
  {#if value?.length > 4}
    <button class="se-card-carousel__prev" on:click={prev}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z"/></svg>
    </button>
  {/if}
  <div class="se-card-carousel__screens">
    {#each Array(Math.ceil(value?.length / 4)) as _, i}
      <div class="se-card-carousel__screen se-card-carousel__screen--{direction}" class:se-card-carousel__screen--active={i == screen}>
        {#each Array(4) as _, j}
          {#if value[i*4+j]}
            <div class="se-card-carousel__item">
              <Card bind:value={value[i*4+j]}/>
            </div>
          {:else}
            <div class="se-card-carousel__spacer">
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
  {#if value?.length > 4}
    <button class="se-card-carousel__next" on:click={next}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM297 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L120 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L409 239c9.4 9.4 9.4 24.6 0 33.9L297 385z"/></svg>
    </button>
  {/if}
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
    flex: 0 0 auto;
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

  .se-card-carousel__screens {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .se-card-carousel__screen {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
    max-width: 100%;
    padding: 1rem 0;
  }

  .se-card-carousel__item {
    position: relative;
    scroll-snap-align: center;
    width: 70vw;
  }

  .se-card-carousel__spacer {
    display: none;
  }


  @media (min-width: 1200px) {
    .se-card-carousel {
      justify-content: center;
      padding: 0;
    }

    .se-card-carousel__screens {
      display: grid;
    }

    .se-card-carousel__screen {
      grid-area: 1 / 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .se-card-carousel__screen:not(.se-card-carousel__screen--active) {
      pointer-events: none;
    }

    .se-card-carousel__next, 
    .se-card-carousel__prev {
      display: block;
    }

    .se-card-carousel__item {
      width: auto;
    }

    .se-card-carousel__spacer {
      display: block;
    }
  }

  @keyframes se-card-carousel--next {
    0% {
      transform: translateX(2rem);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(0rem);
    }
  }

  @keyframes se-card-carousel--prev {
    0% {
      transform: translateX(-2rem);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(0rem);
    }
  }

  .se-card-carousel__screen:not(.se-card-carousel__screen--active) {
    opacity: 0;
  }

  .se-card-carousel__screen--next.se-card-carousel__screen--active {
    animation: se-card-carousel--next 400ms ease-in-out;
  }

  .se-card-carousel__screen--prev.se-card-carousel__screen--active {
    animation: se-card-carousel--prev 400ms ease-in-out;
  }

  .se-card-carousel__screen {
    transform: translateX(0px);
    opacity: 1;
    transition: all 200ms ease-in-out;
  }

  


</style>