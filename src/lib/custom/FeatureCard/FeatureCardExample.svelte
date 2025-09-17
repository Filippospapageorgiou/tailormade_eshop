<script>
    import { ShieldHalf } from 'lucide-svelte';
	import { Coffee } from "lucide-svelte";
	import Settings from "lucide-svelte/icons/settings";
	import Features from "./Features.svelte";
    


  //  className="size-6 text-primary"
  let data = [
    {
      id: 1,
      title: "1. True Specialty",
      content:
        "Επιλέγουμε specialty καφέδες που βαθμολογούνται με 84+ πόντους, εστιάζοντας σε καθαρές, ισχυρές γεύσεις με χαρακτηριστικά που αποτυπώνουν την προέλευσή τους, συνεργαζόμενοι αποκλειστικά με αξιόπιστους συνεργάτες",
      image:
        "/tailor1.png",
      icon: Settings,
    },
    {
      id: 2,
      title: "2. Redefining Fresh",
      content:
        "Επιλέγουμε καφέδες κάθε τρίμηνο, σύμφωνα με τον κύκλο συγκομιδής κάθε χώρας, εξασφαλίζοντας ότι πάντα προσφέρουμε τους πιο φρέσκους κόκκους, διατηρώντας την ποιότητα και τη γεύση τους.",
      image:
        "/tailor2.png",
      icon: Coffee,
    },
    {
      id: 3,
      title: "3. Team",
      content:
        "Η εμπιστοσύνη είναι το παν για εμάς. Με ασφαλείς και απλές μεθόδους συναλλαγών, εξασφαλίζουμε ότι κάθε αγορά είναι εύκολη, γρήγορη και αξιόπιστη, κάνοντας την εμπιστοσύνη σας τη μεγαλύτερη προτεραιότητά μας.",
      image:
        "/team.png",
      icon: ShieldHalf,
    },
  ];
</script>

<Features {data} />
