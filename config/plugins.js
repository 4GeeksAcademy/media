module.exports = ({ env }) => {
    const jsonStr = env('GOOGLE_CLOUD_JSON','');
    const buff = Buffer.from(jsonStr, 'base64');
    const _object = JSON.parse(buff.toString('utf-8'));
    return ({
        upload: {
            provider: 'google-cloud-storage',
            providerOptions: {
                bucketName: 'media-gallery',
                publicFiles: true,
                uniform: false,
                serviceAccount: _object,
            },
        },
        email: {
            provider: 'mailgun',
            providerOptions: {
                apiKey: env('MAILGUN_API_KEY'),
                domain: env('MAILGUN_DOMAIN'), //Required if you have an account with multiple domains
            },
            settings: {
                defaultFrom: env('MAILGUN_FROM'),
                defaultReplyTo: env('MAILGUN_TO'),
            },
        },
    })
};