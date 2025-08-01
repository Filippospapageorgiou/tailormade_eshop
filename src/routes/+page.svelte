<script lang="ts">
    import Navbar from "$lib/custom/navbar.svelte";
    
    let { data } = $props();
    
</script>

<Navbar {data} />
