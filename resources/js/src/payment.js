function CreationShopPayment(publishableKey) {
    if (typeof publishableKey !== 'string') {
        console.error('Please provide a publishable key');
        return;
    }
    let keyLength = publishableKey.length;
    if (publishableKey.includes('_test_')) {
        keyLength -= 5;
    }
    if (keyLength !== 38 || publishableKey.slice(0, 3) !== 'pk_') {
        console.error('Please provide a valid publishable key');
        return;
    }

    return {
        publishableKey,

        initPayment(paymentSecret) {
            if (typeof paymentSecret !== 'string') {
                console.error('Please provide a payment secret');
                return;
            }
            if (paymentSecret.length !== 255 || paymentSecret.slice(0, 3) !== 'ps_') {
                console.error('Please provide a valid payment secret');
                return;
            }
            let popupOptions = {
                url: `http://payment-portal.net:88/pay?pk=${this.publishableKey}&ps=${paymentSecret}`,
                target: 'payment',
                w: 450,
                h: 500
            };
            popup(popupOptions);
        }
    }
}

function popup({url, target, w, h}) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
        url,
        target,
        `scrollbars=1,width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`
    );

    if (window.focus) newWindow.focus();
}