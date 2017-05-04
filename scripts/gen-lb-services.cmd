cd src && lb-ng ./server/server.js ./client/lb/lb-services.js && cd .. &&  echo 'patching' && git apply ./patches/lb-services-patch.diff &&  echo 'patched'
