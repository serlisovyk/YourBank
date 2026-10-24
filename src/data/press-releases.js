const releases = [
  {
    title:
      'YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction',
    location: 'India',
    date: '2024-11-06',
    text: 'YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.',
    image: '/assets/images/press/rewards.webp',
    imageAlt: 'Two people shaking hands',
  },
  {
    title: 'YourBank Expands Branch Network with Opening of New Location in Chennai',
    location: 'India',
    date: '2024-11-12',
    text: 'YourBank is excited to announce the grand opening of our newest branch in Chennai. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.',
    image: '/assets/images/press/branch.webp',
    imageAlt: 'Glass skyscrapers seen from below',
  },
  {
    title:
      'YourBank Partners with Local Nonprofit to Support Financial Education Initiatives',
    location: 'India',
    date: '2024-12-24',
    text: 'YourBank is proud to announce a new partnership with a local nonprofit organization dedicated to improving financial literacy. Through workshops, online resources, and one-on-one guidance, this initiative aims to give individuals and families the knowledge and confidence to manage their money wisely. By investing in financial education, we hope to empower our community and help build a stronger financial future for everyone.',
    image: '/assets/images/press/education.webp',
    imageAlt: 'Hands signing documents on a desk',
  },
  {
    title:
      'YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility',
    location: 'India',
    date: '2024-12-28',
    text: 'YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.',
    image: '/assets/images/press/sustainability.webp',
    imageAlt: 'A man holding a tablet next to a hand-drawn globe with arrows',
  },
]

export const pressReleases = releases.map((release) => ({
  ...release,
  displayDate: release.date.split('-').reverse().join('/'),
}))
