import affirmations from '~/assets/affirmations.json';

type Affirmation = {
  text: string;
  source?: string;
}

export const useAffirmations = () => {
  const randomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex] as Affirmation;
  };

  const triggerAffirmation = async (name: string) => {
    const shouldShow = Math.random() > 0.6;

    if (shouldShow) {
      const affirmation = randomAffirmation();

      (await alertController.create({
        header: `Hey ${name}!`,
        message: `<p class="text-xl pt-6 pb-8">${affirmation.text}</p>${affirmation.source 
            ? `<p class="text-right"><i>&mdash; ${affirmation.source}</i></p>` 
            : ''}`,
        buttons: ['Ja!']
      })).present();
    }
  };

  return {
    triggerAffirmation
  };
};
