# Just formats the number so they are easier to process because
# I need to get this done and it's quicker this way.

echo 'Converting file RawStripperNumbers.txt'
sed -r 's/ //g' RawStripperNumbers.txt > out1
cat out1 | sed '/^$/d' | less > out2
sed -r 's/(^|$)/"/g' out2 > out3
sed -r 's/$/,/g' out3 > out4 
sed '$ s/.$//' out4 > RawStripperNumbers2.txt 
rm out{1,2,3,4}
mv RawStripperNumbers2.txt RawStripperNumbers.txt 
# rm RawStripperNumbers.tmp
echo 'Successfully converted file.'
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
echo 'please paste into StripperUtils.js src/strippervillemiami/utils/StripperUtils.js'
echo 'file in the correct place.'
echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
