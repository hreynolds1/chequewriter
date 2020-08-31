function numtowords(numlist){
    for (x in numlist){
        if ((typeof numlist[x])=="string"){numlist[x]=parseInt(numlist[x])}
    }
    str=""
    str+=hundreds[numlist[2]]
    if (!(numlist[1]==0 && numlist[0]==0) && numlist[2]!=0){
        str+=" and "
    }
    if (numlist[1]==1){
        str+=teens[numlist[0]]
    } else {
        str+=tens[numlist[1]]
        if (!(numlist[1]==0 || numlist[0]==0)){str+="-"}
        str+=ones[numlist[0]]
    }
    return str
}
function arraysequal(ar1,ar2){
    match=true
    for (x in ar1){
        if (ar1[x]!=ar2[x]){
            match=false
        }
    }
    return match;
    
}
Array.prototype.chunks=function(size=1){
    totalarray=[];
    listlength=this.length
    for (i=0;i+size<=listlength;i+=size){
        totalarray.push(this.slice(i,i+size))
    }
    return totalarray
}
ones=["","one","two","three","four","five","six","seven","eight","nine"]
tens=["","","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"]
teens=["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"]
hundreds=["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"]
places=["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion","quattuordecillion","quindecillion","hexdecillion","septendecillion","octodecillion","novemdecilion","vigintillion","unvigintillion","duovigintillion","quattuorvigintillion","quinvigintillion","hexvigintillion","septenvigintillion","octovigintillion","novemvigintillion","trigintillion","untrigintillion","duotrigintillion","quattuortrigintillion","quintrigintillion","hextrigintillion","septentrigintillion","octotrigintillion","novemtrigintillion"]
function submitinfo(){
    sender=document.querySelector("#sender").value
    sender=sender.charAt(0).toUpperCase() + sender.slice(1)
    recipient=document.querySelector("#recipient").value
    recipient=recipient.charAt(0).toUpperCase() + recipient.slice(1)
    amount=document.querySelector("#money").value
    if (sender=="" || recipient=="" || amount=="" || amount==0){throw "empty field"};
    cheque=""
    splitnum=amount.toString().split("").reverse()
    for (x in splitnum){
        if ((typeof splitnum[x])=="string"){splitnum[x]=parseInt(splitnum[x])}
    }
    if (splitnum.length<3){
        while (splitnum.length<3){
            splitnum.push(0)
        }
    } else {
        while (splitnum.length/3!=parseInt(splitnum.length/3)){
            splitnum.push(0)
        }
    }
    chunkednum=splitnum.chunks(3).reverse()
    places2=places.slice(0,chunkednum.length).reverse()
    for (i=0;i<chunkednum.length;i++){
        if (numtowords(chunkednum[i])!=""){cheque+=""+numtowords(chunkednum[i])+" "+places2[i]+", "}
    }
    cheque=cheque.charAt(0).toUpperCase() + cheque.slice(1)
    document.getElementById("recipientb").innerHTML="Pay "+recipient
    document.getElementById("amount").innerHTML=cheque.substring(0,cheque.length-2)+" dollars only"
    document.getElementById("senderb").innerHTML="Signed "+sender
}
