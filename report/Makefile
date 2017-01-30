default : report.pdf

report.tex : compiler.lhs
	lhs2TeX -o report.tex compiler.lhs

report.pdf : report.tex
	pdflatex report.tex

