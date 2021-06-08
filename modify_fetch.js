// This is a JavaScript file

const fs = require('fs');
const fpath = require.resolve('cordova-fetch');

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const target = "await superspawn.spawn('npm', args, { cwd: dest });";
const adding = "await new Promise(resolve => setTimeout(resolve, 1000));";

  console.log('fix-fetch start :' + fpath);
	const text = fs.readFileSync(fpath, 'utf8');

	const lines = text.split('\n');

	const regTarget = escapeRegex(target);
	const regAdding = escapeRegex(adding);

	for (let i=0; i<lines.length; i++) {
	  const line = lines[i];
	  if (line.match(regTarget)) {
      console.log('find: ' + line);
	    if (i+1 < lines.length) {
	      const line2 = lines[i+1];
	      if (! line2.match(regAdding)) {
	        console.log('Adding sleep 1 second after npm install in cordova-fetch');
          console.log('cordova-fetch: ' + fpath); 
          const str = "events.emit('warn', '===== Sleep 1 seconds =====');\n";
	        lines.splice(i+1, 0, str + "    " + adding);
	        const newText = lines.join('\n');
//	        fs.writeFileSync(fpath, newText);
          delete require.cache[fpath];

	        break;  
	      }
	    }
	  }
	}
