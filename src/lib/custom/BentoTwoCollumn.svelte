<script>
    import BentoGrid from "./bentoGrid/BentoGrid.svelte";
    import BentoGridItem from "./bentoGrid/BentoGridItem.svelte";
    import TwoColumnSkeleton from "./bentoGrid/TwoColumnSkeleton.svelte";

    
    

    import { Clipboard, FileEditIcon, SignalHighIcon } from "lucide-svelte";


  const items = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: TwoColumnSkeleton,
      className: "md:col-span-2",
      icon: FileEditIcon,
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      header: TwoColumnSkeleton,
      className: "md:col-span-1",
      icon: FileEditIcon,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: TwoColumnSkeleton,
      className: "md:col-span-1",
      icon: SignalHighIcon,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: TwoColumnSkeleton,
      className: "md:col-span-2",
      icon: SignalHighIcon,
    },
  ];
</script>

<BentoGrid class="max-w-4xl mx-auto md:auto-rows-[20rem]">
  {#each items as item, i}
    <BentoGridItem
      title={item.title}
      description={item.description}
      class={item.className}
    >
      <div slot="header">
        <svelte:component this={item.header} />
      </div>
      <div slot="icon">
        <svelte:component this={item.icon} class="h-4 w-4 text-neutral-500" />
      </div>
    </BentoGridItem>
  {/each}
</BentoGrid>
