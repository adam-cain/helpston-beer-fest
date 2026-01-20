/**
 * ============================================================================
 * KEYSTATIC CMS CONFIGURATION
 * ============================================================================
 * 
 * This file defines the content schema for the Helpston Beer Festival website.
 * All content is stored as YAML/Markdown files in the /content directory.
 * 
 * Collections:
 * - sponsors: Individual sponsor entries
 * - sponsorship-packages: Sponsorship tier definitions
 * - charities: Charity information
 * - impact-reports: Annual fund allocation reports
 * - gallery-albums: Photo galleries by year
 * 
 * Singletons:
 * - site-settings: Global site configuration
 * 
 * @see https://keystatic.com/docs
 */

import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    // Use 'local' for development, 'github' for production with GitHub integration
    kind: 'local',
  },
  
  ui: {
    brand: {
      name: 'Helpston Beer Festival',
    },
    navigation: {
      'Site Configuration': ['site-settings', 'homepage'],
      'Sponsors': ['sponsors', 'sponsorship-packages'],
      'Charities & Impact': ['charities', 'impact-reports'],
      'Media': ['gallery-albums'],
    },
  },

  singletons: {
    /**
     * SITE SETTINGS
     * Global configuration for the entire website
     */
    'site-settings': singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      format: { data: 'yaml' },
      schema: {
        eventTitle: fields.text({
          label: 'Event Title',
          description: 'The main title displayed on the homepage',
          validation: { isRequired: true },
        }),
        eventDate: fields.date({
          label: 'Event Start Date',
          description: 'The first day of the festival',
          validation: { isRequired: true },
        }),
        eventEndDate: fields.date({
          label: 'Event End Date',
          description: 'The last day of the festival (leave empty for single-day event)',
        }),
        contactEmail: fields.text({
          label: 'Contact Email',
          description: 'Primary contact email for enquiries',
          validation: { isRequired: true },
        }),
        ticketLink: fields.url({
          label: 'Ticket Purchase Link',
          description: 'URL where visitors can buy tickets (leave empty if not available)',
        }),
        social: fields.object({
          facebook: fields.url({ label: 'Facebook Page URL' }),
          instagram: fields.url({ label: 'Instagram Profile URL' }),
          twitter: fields.url({ label: 'Twitter/X Profile URL' }),
        }, {
          label: 'Social Media Links',
        }),
      },
    }),

    /**
     * HOMEPAGE CONTENT
     * Editable content sections for the homepage
     */
    'homepage': singleton({
      label: 'Homepage Content',
      path: 'content/pages/home',
      format: { data: 'yaml' },
      schema: {
        heroTitle: fields.text({
          label: 'Hero Title',
          description: 'The main title displayed on the hero section',
          validation: { isRequired: true },
        }),
        charitySection: fields.object({
          subtitle: fields.text({ label: 'Subtitle' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
          ctaText: fields.text({ label: 'Button Text' }),
          ctaLink: fields.url({ label: 'Button Link' }),
          image: fields.image({
            label: 'Image',
            directory: 'public/other',
            publicPath: '/other/',
          }),
        }, { label: 'Charity Section' }),
        locationSection: fields.object({
          subtitle: fields.text({ label: 'Subtitle' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
          ctaText: fields.text({ label: 'Button Text' }),
          ctaLink: fields.url({ label: 'Button Link' }),
        }, { label: 'Location Section' }),
        foodSection: fields.object({
          subtitle: fields.text({ label: 'Subtitle' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
          ctaText: fields.text({ label: 'Button Text' }),
          ctaLink: fields.text({ label: 'Button Link' }),
          image: fields.image({
            label: 'Image',
            directory: 'public/images/food',
            publicPath: '/images/food/',
          }),
        }, { label: 'Food & Drink Section' }),
        musicSection: fields.object({
          subtitle: fields.text({ label: 'Subtitle' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
          ctaText: fields.text({ label: 'Button Text' }),
          ctaLink: fields.url({ label: 'Button Link' }),
          image: fields.image({
            label: 'Image',
            directory: 'public/other',
            publicPath: '/other/',
          }),
        }, { label: 'Live Music Section' }),
        sponsorsSection: fields.object({
          subtitle: fields.text({ label: 'Subtitle' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
          ctaText: fields.text({ label: 'Button Text' }),
          ctaLink: fields.text({ label: 'Button Link' }),
        }, { label: 'Sponsors Section' }),
      },
    }),
  },

  collections: {
    /**
     * SPONSORS COLLECTION
     * Individual sponsor entries with logo, tier, and contact details
     */
    sponsors: collection({
      label: 'Sponsors',
      path: 'content/sponsors/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Sponsor Name',
            description: 'The company or organisation name',
            validation: { isRequired: true },
          },
        }),
        url: fields.url({
          label: 'Website URL',
          description: 'Link to the sponsor\'s website',
        }),
        logo: fields.image({
          label: 'Logo',
          description: 'Sponsor logo image (PNG or SVG recommended)',
          directory: 'public/images/sponsors',
          publicPath: '/images/sponsors/',
        }),
        tier: fields.select({
          label: 'Sponsorship Tier',
          description: 'The level of sponsorship',
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Silver', value: 'silver' },
            { label: 'Bronze', value: 'bronze' },
            { label: 'Supporter', value: 'supporter' },
          ],
          defaultValue: 'supporter',
        }),
        displayColor: fields.select({
          label: 'Card Background',
          description: 'Background color for the sponsor card',
          options: [
            { label: 'Light (White)', value: 'light' },
            { label: 'Dark (Black)', value: 'dark' },
          ],
          defaultValue: 'light',
        }),
        active: fields.checkbox({
          label: 'Active Sponsor',
          description: 'Uncheck to hide from the website',
          defaultValue: true,
        }),
      },
    }),

    /**
     * SPONSORSHIP PACKAGES COLLECTION
     * Defines available sponsorship tiers and what they include
     */
    'sponsorship-packages': collection({
      label: 'Sponsorship Packages',
      path: 'content/sponsorship-packages/*',
      slugField: 'tierName',
      format: { data: 'yaml' },
      schema: {
        tierName: fields.slug({
          name: {
            label: 'Package Name',
            description: 'e.g., "Gold Sponsor", "Platinum Partner"',
            validation: { isRequired: true },
          },
        }),
        price: fields.number({
          label: 'Price (£)',
          description: 'Cost of this sponsorship package',
          validation: { isRequired: true, min: 0 },
        }),
        sortOrder: fields.number({
          label: 'Display Order',
          description: 'Lower numbers appear first (e.g., Platinum=1, Gold=2)',
          defaultValue: 10,
        }),
        available: fields.checkbox({
          label: 'Available',
          description: 'Uncheck if this package is sold out',
          defaultValue: true,
        }),
        featured: fields.checkbox({
          label: 'Featured Package',
          description: 'Highlight this package on the page',
          defaultValue: false,
        }),
        inclusions: fields.document({
          label: 'What\'s Included',
          description: 'List of benefits included in this package',
          formatting: true,
        }),
      },
    }),

    /**
     * CHARITIES COLLECTION
     * Information about charitable beneficiaries
     */
    charities: collection({
      label: 'Charities',
      path: 'content/charities/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Charity Name',
            validation: { isRequired: true },
          },
        }),
        description: fields.document({
          label: 'Description',
          description: 'About this charity and their work',
          formatting: true,
          links: true,
        }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/charities',
          publicPath: '/images/charities/',
        }),
        website: fields.url({
          label: 'Website URL',
        }),
        yearFeatured: fields.number({
          label: 'Year Featured',
          description: 'The year this charity was the primary beneficiary',
        }),
        isPrimary: fields.checkbox({
          label: 'Current Primary Beneficiary',
          description: 'Check if this is the main charity for the current event',
          defaultValue: false,
        }),
      },
    }),

    /**
     * IMPACT REPORTS COLLECTION
     * Annual reports showing how funds were allocated
     */
    'impact-reports': collection({
      label: 'Impact Reports',
      path: 'content/impact-reports/*',
      slugField: 'year',
      format: { data: 'yaml' },
      schema: {
        year: fields.slug({
          name: {
            label: 'Year',
            description: 'The festival year this report covers',
            validation: { isRequired: true },
          },
        }),
        totalRaised: fields.number({
          label: 'Total Amount Raised (£)',
          validation: { isRequired: true, min: 0 },
        }),
        content: fields.document({
          label: 'Report Content',
          description: 'Detailed report on the event and fund allocation',
          formatting: true,
          links: true,
          images: true,
        }),
        beneficiaries: fields.array(
          fields.object({
            name: fields.text({
              label: 'Recipient Name',
              validation: { isRequired: true },
            }),
            amount: fields.number({
              label: 'Amount Received (£)',
              validation: { isRequired: true, min: 0 },
            }),
            description: fields.text({
              label: 'Description',
              description: 'Brief note about what the funds were used for',
            }),
          }),
          {
            label: 'Fund Recipients',
            description: 'Breakdown of how funds were distributed',
            itemLabel: (props) => props.fields.name.value || 'New Recipient',
          }
        ),
      },
    }),

    /**
     * GALLERY ALBUMS COLLECTION
     * Photo galleries organised by year
     */
    'gallery-albums': collection({
      label: 'Gallery Albums',
      path: 'content/gallery/*',
      slugField: 'year',
      format: { data: 'yaml' },
      schema: {
        year: fields.slug({
          name: {
            label: 'Year',
            description: 'The festival year',
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: 'Album Title',
          description: 'e.g., "2024 Festival Highlights"',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Album Description',
          description: 'Brief description of this album',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          description: 'The main image shown in the gallery index',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Photo',
              directory: 'public/images/gallery',
              publicPath: '/images/gallery/',
              validation: { isRequired: true },
            }),
            caption: fields.text({
              label: 'Caption',
              description: 'Optional description of this photo',
            }),
            photographer: fields.text({
              label: 'Photographer Credit',
            }),
          }),
          {
            label: 'Photos',
            description: 'Images in this album',
            itemLabel: (props) => props.fields.caption.value || 'Photo',
          }
        ),
      },
    }),
  },
});
